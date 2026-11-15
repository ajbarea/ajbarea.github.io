import { expect, test } from '@playwright/test'

test.describe('Palette Studio', () => {
  test('opens palette studio, selects a named theme and updates root theme attributes', async ({
    page
  }) => {
    await page.goto('/')

    // Default theme is Ember
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'ember')

    // Open Palette Studio
    const trigger = page.locator('button[aria-label^="Palette Studio:"]:visible')
    await expect(trigger).toBeVisible()
    await trigger.click()

    const dialog = page.locator('div[role="dialog"][aria-label="Palette Studio"]')
    await expect(dialog).toBeVisible()

    // Verify 11 named themes exist
    const themeRadios = dialog.locator('button[role="radio"]')
    await expect(themeRadios).toHaveCount(14) // 3 mode options + 11 theme options

    // Click 'Forest' theme
    const forestRadio = dialog.locator('button[role="radio"]:has-text("Forest")')
    await forestRadio.click()

    // Assert html attributes updated
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'forest')
    const primaryH = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--primary-h')
    )
    expect(primaryH).toBe('145')

    // Navigate to /projects and ensure theme persists
    await page.goto('/projects')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'forest')

    // Verify localStorage persistence
    const storedTheme = await page.evaluate(() => localStorage.getItem('palette-theme'))
    expect(storedTheme).toBe('forest')
  })

  test('adjusts live hue dial and updates custom hue token', async ({ page }) => {
    await page.goto('/')

    const trigger = page.locator('button[aria-label^="Palette Studio:"]:visible')
    await trigger.click()

    const slider = page.locator('input#hue-dial-input')
    await expect(slider).toBeVisible()

    // Drag / set slider value to 285 (Amethyst-like)
    await slider.fill('285')
    await slider.dispatchEvent('input')

    await expect(page.locator('html')).toHaveAttribute('data-custom-hue', '285')
    const primaryH = await page.evaluate(() =>
      document.documentElement.style.getPropertyValue('--primary-h')
    )
    expect(primaryH).toBe('285')

    // Reload page and ensure custom hue persists
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-custom-hue', '285')
  })

  test('closes on Escape key press', async ({ page }) => {
    await page.goto('/')

    const trigger = page.locator('button[aria-label^="Palette Studio:"]:visible')
    await trigger.click()

    const dialog = page.locator('div[role="dialog"][aria-label="Palette Studio"]')
    await expect(dialog).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
  })
})
