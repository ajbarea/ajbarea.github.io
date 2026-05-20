import { chromium } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { writeFileSync, mkdirSync } from 'fs'

mkdirSync('/tmp/audit', { recursive: true })

const URL = 'http://localhost:3000/'
const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 }
]
const MODES = ['light', 'dark']

const browser = await chromium.launch()
const report = {
  screenshots: [],
  console: {},
  network: {},
  axe: null,
  performance: null,
  focusOrder: null
}

for (const vp of VIEWPORTS) {
  for (const mode of MODES) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: mode,
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

    const fileName = `${vp.name}-${mode}.png`
    await page.screenshot({ path: `/tmp/audit/${fileName}`, fullPage: true })
    report.screenshots.push(`/tmp/audit/${fileName}`)

    const key = `${vp.name}-${mode}`
    report.console[key] = consoleMessages
    report.network[key] = failedRequests

    if (vp.name === 'desktop' && mode === 'light') {
      const axeResult = await new AxeBuilder({ page }).analyze()
      report.axe = {
        violations: axeResult.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          help: v.help,
          helpUrl: v.helpUrl,
          nodeCount: v.nodes.length,
          firstNodeTarget: v.nodes[0]?.target,
          firstNodeHtml: v.nodes[0]?.html?.slice(0, 200)
        })),
        passes: axeResult.passes.length,
        incomplete: axeResult.incomplete.length,
        inapplicable: axeResult.inapplicable.length
      }

      report.performance = await page.evaluate(async () => {
        const nav = performance.getEntriesByType('navigation')[0]
        const paints = performance.getEntriesByType('paint')
        const fp = paints.find((p) => p.name === 'first-paint')?.startTime
        const fcp = paints.find((p) => p.name === 'first-contentful-paint')?.startTime
        const resources = performance.getEntriesByType('resource')
        const totalTransferSize = resources.reduce((s, r) => s + (r.transferSize || 0), 0)
        const totalDecodedSize = resources.reduce((s, r) => s + (r.decodedBodySize || 0), 0)

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

        return {
          domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd),
          loadMs: Math.round(nav.loadEventEnd),
          firstPaintMs: fp != null ? Math.round(fp) : null,
          firstContentfulPaintMs: fcp != null ? Math.round(fcp) : null,
          largestContentfulPaintMs: lcp != null ? Math.round(lcp) : null,
          cumulativeLayoutShift: Math.round(cls * 1000) / 1000,
          resourceCount: resources.length,
          totalTransferKB: Math.round(totalTransferSize / 1024),
          totalDecodedKB: Math.round(totalDecodedSize / 1024),
          domNodes: document.querySelectorAll('*').length
        }
      })

      const focusOrder = []
      for (let i = 0; i < 25; i++) {
        await page.keyboard.press('Tab')
        const info = await page.evaluate(() => {
          const el = document.activeElement
          if (!el || el === document.body) return null
          const rect = el.getBoundingClientRect()
          return {
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || '').trim().slice(0, 50),
            aria: el.getAttribute('aria-label'),
            href: el.getAttribute('href'),
            visible: rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight,
            x: Math.round(rect.x),
            y: Math.round(rect.y)
          }
        })
        if (!info) break
        focusOrder.push(info)
      }
      report.focusOrder = focusOrder
    }

    await ctx.close()
  }
}

await browser.close()

writeFileSync('/tmp/audit/report.json', JSON.stringify(report, null, 2))
console.log(
  JSON.stringify(
    {
      screenshots: report.screenshots,
      axeSummary: {
        violations: report.axe.violations.length,
        byImpact: report.axe.violations.reduce((acc, v) => {
          acc[v.impact] = (acc[v.impact] || 0) + 1
          return acc
        }, {})
      },
      performance: report.performance,
      consoleIssues: Object.fromEntries(
        Object.entries(report.console).filter(([, v]) => v.length > 0)
      ),
      networkFailures: Object.fromEntries(
        Object.entries(report.network).filter(([, v]) => v.length > 0)
      ),
      focusOrderLength: report.focusOrder.length
    },
    null,
    2
  )
)
