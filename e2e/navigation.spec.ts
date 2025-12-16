import { test, expect } from '@playwright/test'

/**
 * E2E Navigation Test
 * Tests that users can visit all 5 main routes and each page loads without errors.
 */

test.describe('Navigation', () => {
  test('should navigate to Home page', async ({ page }) => {
    await page.goto('/')

    // Verify page loads without errors
    await expect(page).toHaveTitle(/AJ Barea/)

    // Verify main content is visible
    await expect(page.locator('#main-content')).toBeVisible()
  })

  test('should navigate to Projects page', async ({ page }) => {
    await page.goto('/projects')

    // Verify page loads with correct title
    await expect(page).toHaveTitle(/Projects.*AJ Barea/)

    // Verify main content is visible
    await expect(page.locator('#main-content')).toBeVisible()
  })

  test('should navigate to Resume page', async ({ page }) => {
    await page.goto('/resume')

    // Verify page loads with correct title
    await expect(page).toHaveTitle(/Resume.*AJ Barea/)

    // Verify main content is visible
    await expect(page.locator('#main-content')).toBeVisible()
  })

  test('should navigate to Blog page', async ({ page }) => {
    await page.goto('/blog')

    // Verify page loads with correct title
    await expect(page).toHaveTitle(/Blog.*AJ Barea/)

    // Verify main content is visible
    await expect(page.locator('#main-content')).toBeVisible()
  })

  test('should navigate between routes using navigation links', async ({ page }) => {
    // Start at home
    await page.goto('/')
    await expect(page).toHaveTitle(/AJ Barea/)

    // Navigate to Projects via nav link
    await page.click('nav a[href="/projects"]')
    await expect(page).toHaveURL(/\/projects/)
    await expect(page).toHaveTitle(/Projects/)

    // Navigate to Resume via nav link
    await page.click('nav a[href="/resume"]')
    await expect(page).toHaveURL(/\/resume/)
    await expect(page).toHaveTitle(/Resume/)

    // Navigate to Blog via nav link
    await page.click('nav a[href="/blog"]')
    await expect(page).toHaveURL(/\/blog/)
    await expect(page).toHaveTitle(/Blog/)

    // Navigate back to Home via nav link
    await page.click('nav a[href="/"]')
    await expect(page).toHaveURL(/\/$/)
  })

  test('should show 404 page for non-existent routes', async ({ page }) => {
    await page.goto('/non-existent-page')

    // Verify 404 page loads
    await expect(page).toHaveTitle(/404/)

    // Verify main content is visible
    await expect(page.locator('#main-content')).toBeVisible()
  })
})
