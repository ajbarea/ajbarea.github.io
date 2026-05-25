import { test, expect } from '@playwright/test'

/**
 * E2E SEO Test — RSS + Atom activity feeds
 * Guards that the prerendered /rss.xml and /atom.xml ship with the build and
 * carry the activity items (publications + hackathons + conferences) so
 * readers can subscribe. Asserts feed validity + a stable item title rather
 * than an exact count, so adding an item later doesn't break the guard.
 */

test.describe('SEO: activity feeds', () => {
  test('/rss.xml is a valid RSS 2.0 feed carrying activity items', async ({ request }) => {
    const res = await request.get('/rss.xml')
    expect(res.ok()).toBeTruthy()
    const xml = await res.text()
    expect(xml).toContain('<rss version="2.0">')
    expect(xml).toContain('Research')
    expect((xml.match(/<item>/g) ?? []).length).toBeGreaterThan(0)
    // A structured (non-i18n) item title that is stable across content edits.
    expect(xml).toContain('HackerRank Orchestrate')
  })

  test('/atom.xml is a valid Atom feed with the same items', async ({ request }) => {
    const res = await request.get('/atom.xml')
    expect(res.ok()).toBeTruthy()
    const xml = await res.text()
    expect(xml).toContain('http://www.w3.org/2005/Atom')
    expect((xml.match(/<entry>/g) ?? []).length).toBeGreaterThan(0)
    expect(xml).toContain('HackerRank Orchestrate')
  })
})
