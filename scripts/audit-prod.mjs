import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const URL = 'http://localhost:4000/'

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1
})
const page = await ctx.newPage()

const consoleMessages = []
const failedRequests = []
page.on('console', (msg) => {
  if (['error', 'warning'].includes(msg.type())) {
    consoleMessages.push({ type: msg.type(), text: msg.text() })
  }
})
page.on('requestfailed', (req) => {
  failedRequests.push({ url: req.url(), failure: req.failure()?.errorText })
})

await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForTimeout(800)

const axeResult = await new AxeBuilder({ page }).analyze()

const perf = await page.evaluate(async () => {
  const nav = performance.getEntriesByType('navigation')[0]
  const paints = performance.getEntriesByType('paint')
  const fcp = paints.find((p) => p.name === 'first-contentful-paint')?.startTime
  const resources = performance.getEntriesByType('resource')

  const lcp = await new Promise((resolve) => {
    let value = null
    const obs = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      if (entries.length) value = entries[entries.length - 1].startTime
    })
    obs.observe({ type: 'largest-contentful-paint', buffered: true })
    setTimeout(() => {
      obs.disconnect()
      resolve(value)
    }, 1500)
  })

  const cls = await new Promise((resolve) => {
    let value = 0
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) value += entry.value
      }
    })
    obs.observe({ type: 'layout-shift', buffered: true })
    setTimeout(() => {
      obs.disconnect()
      resolve(value)
    }, 1500)
  })

  const totalTransfer = resources.reduce((s, r) => s + (r.transferSize || 0), 0)
  const totalDecoded = resources.reduce((s, r) => s + (r.decodedBodySize || 0), 0)

  const byType = {}
  for (const r of resources) {
    const t = r.initiatorType || 'other'
    byType[t] = byType[t] || { count: 0, transfer: 0 }
    byType[t].count++
    byType[t].transfer += r.transferSize || 0
  }

  const top10 = resources
    .map((r) => ({
      name: r.name.replace(/^https?:\/\/[^/]+/, ''),
      size: r.transferSize || 0,
      type: r.initiatorType
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)

  return {
    domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd),
    loadMs: Math.round(nav.loadEventEnd),
    firstContentfulPaintMs: fcp != null ? Math.round(fcp) : null,
    largestContentfulPaintMs: lcp != null ? Math.round(lcp) : null,
    cumulativeLayoutShift: Math.round(cls * 1000) / 1000,
    resourceCount: resources.length,
    totalTransferKB: Math.round(totalTransfer / 1024),
    totalDecodedKB: Math.round(totalDecoded / 1024),
    byType,
    top10
  }
})

console.log(
  JSON.stringify(
    {
      performance: perf,
      axe: {
        violations: axeResult.violations.length,
        byImpact: axeResult.violations.reduce(
          (a, v) => ({ ...a, [v.impact]: (a[v.impact] || 0) + 1 }),
          {}
        )
      },
      console: consoleMessages,
      networkFailures: failedRequests
    },
    null,
    2
  )
)

await browser.close()
