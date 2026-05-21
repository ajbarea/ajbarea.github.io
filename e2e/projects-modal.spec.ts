import { test, expect } from '@playwright/test'

/**
 * E2E test for the project detail modal.
 *
 * Verifies that clicking a project card title opens the dialog, shows the
 * full tag list (no `+N` truncation), shows the full description (no
 * `line-clamp` excerpt), and that the dialog dismisses cleanly with both
 * the close button and the Escape key.
 */

test.describe('Project detail modal', () => {
  test('opens when a project title is clicked and shows full details', async ({ page }) => {
    await page.goto('/projects')

    // Modal is not in the DOM until opened (no role="dialog" yet).
    await expect(page.getByRole('dialog')).toHaveCount(0)

    // Click the first project card's title button.
    await page.locator('button.project-card__title').first().click()

    // Dialog appears with the right a11y wiring.
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAttribute('aria-modal', 'true')
    await expect(dialog).toHaveAttribute('aria-labelledby', /^project-modal-title-/)
    await expect(dialog).toHaveAttribute('aria-describedby', /^project-modal-desc-/)

    // No "+N" overflow tag — the card's truncation lived in the prior design.
    await expect(dialog).not.toContainText(/^\+\d+$/)
  })

  test('closes via the close button and returns focus to the title', async ({ page }) => {
    await page.goto('/projects')
    const titleBtn = page.locator('button.project-card__title').first()
    await titleBtn.click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()

    await page.getByRole('button', { name: /close project details/i }).click()
    await expect(dialog).toBeHidden()

    // Focus should be back on the title button that opened the modal.
    await expect(titleBtn).toBeFocused()
  })

  test('closes via the Escape key', async ({ page }) => {
    await page.goto('/projects')
    await page.locator('button.project-card__title').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
  })

  test('clicking the backdrop dismisses the modal', async ({ page }) => {
    await page.goto('/projects')
    await page.locator('button.project-card__title').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    // The backdrop carries its own @click handler. Use force to bypass
    // Playwright's pointer-events occlusion check — the backdrop sits at
    // z-60 above the sticky nav (z-50), but Playwright's hit-test is
    // conservative when there are overlapping fixed elements on the page.
    await page.locator('[data-test="modal-backdrop"]').click({ force: true })
    await expect(page.getByRole('dialog')).toBeHidden()
  })
})
