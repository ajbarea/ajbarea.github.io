import { test, expect } from '@playwright/test'

/**
 * E2E — gallery paint
 * With `animation-fill-mode: forwards` on the fade-in, Chromium left loaded
 * images in the CSS-columns grid unpainted after a jump scroll (measured
 * 12 of 27 in view). The fill mode is the cause, so it is what this checks.
 */
test.describe('gallery', () => {
  test('loaded images do not keep a forwards-filled animation', async ({ page }) => {
    await page.goto('/gallery')
    const images = page.locator('img.gallery-image')
    await expect(images.first()).toBeVisible()
    await images
      .first()
      .evaluate((img: HTMLImageElement) =>
        img.complete ? undefined : new Promise((resolve) => img.addEventListener('load', resolve))
      )
    await expect(images.first()).toHaveClass(/animate-fade-in/)
    const fill = await images.first().evaluate((img) => getComputedStyle(img).animationFillMode)
    expect(fill).toBe('backwards')
  })
})
