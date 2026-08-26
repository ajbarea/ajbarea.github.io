import { test, expect } from '@playwright/test'

/**
 * E2E — contact section
 * The Web3Forms-backed form was removed: it added a third-party relay and a spam
 * surface for an audience that emails. What has to keep working is that the
 * address is present, copyable, and that no form came back by accident.
 */
test.describe('contact section', () => {
  test('offers a copyable address and no form', async ({ page }) => {
    await page.goto('/')

    const section = page.locator('#contact')
    await expect(section).toBeVisible()

    await expect(section.getByRole('button', { name: /ajbareaa@gmail\.com/i })).toBeVisible()

    await expect(page.getByRole('button', { name: /send message/i })).toHaveCount(0)
    await expect(page.locator('#contact-message')).toHaveCount(0)
  })

  test('does not publish a phone number anywhere on the resume page', async ({ page }) => {
    await page.goto('/resume')
    await expect(page.locator('body')).not.toContainText('262-7305')
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0)
  })
})
