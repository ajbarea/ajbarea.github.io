import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

/**
 * A11y scan: every main route × both color schemes.
 *
 * Tailwind's `dark:` variant classes ship in component code but Lighthouse and
 * basic axe-core runs only see whatever color scheme the page happens to land
 * in. This spec primes localStorage with the explicit theme before each
 * navigation so axe scans the rendered light and dark surfaces independently —
 * dark-mode contrast bugs hide if you only ever test light, and vice versa.
 *
 * Reads the theme key the way `app/stores/theme.ts` writes it
 * (`localStorage.setItem('theme', 'light' | 'dark' | 'system')`) so the
 * preference survives initTheme() on hydration.
 *
 * research(2026-05): axe-core catches ~57% of WCAG violations by volume per
 * the Deque eval. The remainder needs manual / assistive-tech review; this
 * gate is a floor, not a ceiling. WCAG 2.2 AA is the lab's stated bar.
 */

const ROUTES_TO_SCAN: ReadonlyArray<{ name: string; path: string }> = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects' },
  { name: 'resume', path: '/resume' },
  { name: 'gallery', path: '/gallery' }
]

const THEMES: ReadonlyArray<'light' | 'dark'> = ['light', 'dark']

for (const theme of THEMES) {
  for (const { name, path } of ROUTES_TO_SCAN) {
    test(`a11y: ${name} (${path}) in ${theme} mode`, async ({ page, context }) => {
      // Prime localStorage before the page loads so initTheme() reads the
      // explicit preference instead of falling back to the system default.
      await context.addInitScript((preferredTheme) => {
        localStorage.setItem('theme', preferredTheme)
      }, theme)

      await page.goto(path)

      // Wait for the `dark` class to settle on <html> when we requested it.
      // Skipping this can let axe scan a flash-of-incorrect-theme paint.
      if (theme === 'dark') {
        await page.waitForFunction(() => document.documentElement.classList.contains('dark'))
      } else {
        await page.waitForFunction(() => !document.documentElement.classList.contains('dark'))
      }

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()

      expect(
        results.violations,
        `axe-core found WCAG violations on ${path} in ${theme} mode:\n${JSON.stringify(
          results.violations,
          null,
          2
        )}`
      ).toEqual([])
    })
  }
}
