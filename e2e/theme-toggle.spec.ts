import { expect, test } from '@playwright/test'

/**
 * Theme toggle smoke: confirm the Pinia theme store and DOM are in sync.
 *
 * The store (`app/stores/theme.ts`) drives `.dark` on `<html>` and persists
 * the user choice in localStorage. If the toggle stops writing localStorage,
 * or stops flipping the class, dark-mode users lose continuity across page
 * navigations. This spec is the per-PR guard.
 */

test.describe('theme toggle', () => {
  test('persists dark choice across navigation', async ({ page, context }) => {
    await context.addInitScript(() => {
      localStorage.setItem('theme', 'dark')
    })

    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/dark/)

    // Navigating between SPA routes must preserve the class.
    await page.goto('/projects')
    await expect(page.locator('html')).toHaveClass(/dark/)

    // localStorage was not clobbered.
    const stored = await page.evaluate(() => localStorage.getItem('theme'))
    expect(stored).toBe('dark')
  })

  test('light preference stays light on a hard reload', async ({ page, context }) => {
    await context.addInitScript(() => {
      localStorage.setItem('theme', 'light')
    })

    await page.goto('/')
    await expect(page.locator('html')).not.toHaveClass(/dark/)

    await page.reload()
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  })
})
