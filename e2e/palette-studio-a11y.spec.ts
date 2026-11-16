import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

// The open studio, with its Reset link showing: a11y.spec.ts scans pages, never the studio.
for (const theme of ['light', 'dark'] as const) {
  test(`open Palette Studio with a custom hue has no WCAG violations in ${theme} mode`, async ({
    page,
    context
  }) => {
    await context.addInitScript((preferredTheme) => {
      localStorage.setItem('theme', preferredTheme)
    }, theme)
    await page.goto('/')
    await page.locator('button[aria-label^="Palette Studio:"]:visible').click()
    const dialog = page.locator('div[role="dialog"][aria-label="Palette Studio"]')
    await expect(dialog).toBeVisible()
    await dialog.locator('input[type="range"]').fill('200')
    await expect(dialog.getByRole('button', { name: 'Reset', exact: true })).toBeVisible()

    const results = await new AxeBuilder({ page })
      .include('div[role="dialog"][aria-label="Palette Studio"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
  })
}
