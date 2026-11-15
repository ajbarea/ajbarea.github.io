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

    // Verify 11 named themes and options exist
    const themeRadios = dialog.locator('button[role="radio"]')
    await expect(themeRadios).toHaveCount(17) // 3 ambiance + 3 surface + 11 theme options

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

    const dialog = page.locator('div[role="dialog"][aria-label="Palette Studio"]')
    await expect(dialog).toBeVisible()

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

  test('adjusts hue with fine-tune steppers and selects surface tone', async ({ page }) => {
    await page.goto('/')

    const trigger = page.locator('button[aria-label^="Palette Studio:"]:visible')
    await trigger.click()

    const stepUp = page.locator('button[aria-label="Increase hue by 5 degrees"]')
    await expect(stepUp).toBeVisible()
    await stepUp.click()

    // 38 (Ember) + 5 = 43
    await expect(page.locator('html')).toHaveAttribute('data-custom-hue', '43')

    // Switch surface tone to OLED Pure Black
    const oledBtn = page.locator('button[role="radio"]:has-text("OLED Pure Black")')
    await oledBtn.click()
    await expect(page.locator('html')).toHaveAttribute('data-surface', 'oled')

    // Click Swatch 950 to activate dark ambiance
    const swatch950 = page.locator('button[aria-label="Swatch 950: Dark Ambiance Canvas"]')
    await swatch950.click()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
