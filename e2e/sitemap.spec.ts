import { test, expect } from '@playwright/test'

/**
 * E2E SEO Test — sitemap + robots
 * The hand-maintained public/sitemap.xml (5 stale routes, lastmod frozen
 * 2025-12-15) was replaced by @nuxtjs/sitemap, which auto-generates an
 * i18n-aware sitemap from the prerendered routes. This guards that the
 * generated artifacts ship with the build and carry the localized URLs +
 * hreflang alternates that the static file never had.
 */

test.describe('SEO: sitemap + robots', () => {
  test('robots.txt is indexable and points at the sitemap index', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.ok()).toBeTruthy()
    const body = await res.text()
    expect(body).toMatch(/User-agent:\s*\*/)
    expect(body).toContain('Sitemap: https://ajbarea.github.io/sitemap_index.xml')
  })

  test('sitemap index references child sitemaps', async ({ request }) => {
    const res = await request.get('/sitemap_index.xml')
    expect(res.ok()).toBeTruthy()
    const xml = await res.text()
    expect(xml).toContain('<sitemapindex')
    expect(xml).toMatch(/<loc>[^<]*sitemap[^<]*<\/loc>/)
  })

  test('a locale sitemap carries localized URLs with hreflang alternates', async ({ request }) => {
    // The index lists absolute production URLs; resolve the first child to a
    // path and fetch it from the preview server.
    const index = await (await request.get('/sitemap_index.xml')).text()
    const childLoc = index.match(/<loc>([^<]+)<\/loc>/)?.[1]
    expect(childLoc, 'sitemap index should list at least one child sitemap').toBeTruthy()
    const childPath = new URL(childLoc as string).pathname

    const xml = await (await request.get(childPath)).text()
    expect(xml).toMatch(/hreflang="es"/)
    expect(xml).toMatch(/https:\/\/ajbarea\.github\.io\/es\//)
  })
})
