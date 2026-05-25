import { test, expect } from '@playwright/test'

/**
 * E2E — contact form UX/a11y
 * The submit button must stay enabled (the disable-until-valid anti-pattern was
 * removed), and submitting an empty message must surface an inline, announced
 * error instead of failing silently. Validator logic is unit-tested in
 * app/utils/__tests__/contact-form.test.ts; this guards the wired behavior.
 */
test.describe('contact form', () => {
  test('keeps Send Message enabled and shows an inline error on empty submit', async ({ page }) => {
    await page.goto('/')

    const submit = page.getByRole('button', { name: /send message/i })
    await expect(submit).toBeEnabled()

    await submit.click()

    await expect(page.locator('#contact-message-error')).toBeVisible()
    await expect(page.locator('#contact-message')).toHaveAttribute('aria-invalid', 'true')
  })
})
