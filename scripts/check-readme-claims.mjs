#!/usr/bin/env node
/**
 * Assert the README's "fragile" marketing claims still match the data files.
 *
 * Drift caught here so far (2026-05-20):
 *   - Project count claimed "15+" when app/data/projects.ts had 9 entries.
 *   - "Cloud" filter listed after it was dropped from projectsByType.
 *   - "Federated Learning" missing from the filter list after it was added.
 *
 * Each assertion is narrow on purpose — we want a clear "this exact substring
 * is missing/wrong" error rather than a general "README looks stale" hand-wave.
 * Extend the registry below when a new fragile claim lands.
 *
 * Run locally: node scripts/check-readme-claims.mjs
 * Exit codes: 0 = all assertions pass, 1 = at least one mismatch.
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const readme = readFileSync(resolve(root, 'README.md'), 'utf-8')
const projectsSrc = readFileSync(resolve(root, 'app/data/projects.ts'), 'utf-8')
const nuxtConfigSrc = readFileSync(resolve(root, 'nuxt.config.ts'), 'utf-8')

const failures = []

// ─── Project gallery claim ─────────────────────────────────────────────────
// Bullet point shape: "- **Project gallery:** N curated projects, filterable by …"
const galleryLine = readme.match(/\*\*Project gallery:\*\* ([^\n]+)/)
// `types:` is indented 4 spaces (object property inside the array entry).
// Tolerate any leading indentation so the regex survives a prettier reformat.
const typeBlocks = [...projectsSrc.matchAll(/^\s+types:\s*\[([^\]]*)\]/gm)]

if (!galleryLine) {
  failures.push('README: "Project gallery" bullet not found')
} else {
  const line = galleryLine[1]

  const actualCount = typeBlocks.length
  const claimedCount = (line.match(/(\d+)\s+curated projects/) || [])[1]
  if (!claimedCount) {
    failures.push(`README project gallery: missing "N curated projects" claim (got "${line}")`)
  } else if (parseInt(claimedCount, 10) !== actualCount) {
    failures.push(
      `README project gallery: claims ${claimedCount} projects, but app/data/projects.ts has ${actualCount}`
    )
  }

  // Filter categories — every distinct `types: [...]` entry should appear.
  const categorySlugs = new Set()
  for (const block of typeBlocks) {
    for (const m of block[1].matchAll(/['"]([\w-]+)['"]/g)) categorySlugs.add(m[1])
  }
  const slugToLabel = {
    'ai-ml': 'AI/ML',
    'federated-learning': 'Federated Learning',
    'full-stack': 'Full-Stack',
    robotics: 'Robotics',
    hackathon: 'Hackathon'
  }
  for (const slug of categorySlugs) {
    const label = slugToLabel[slug]
    if (!label) {
      failures.push(
        `README project gallery: unknown category slug "${slug}" — add label to slugToLabel`
      )
      continue
    }
    if (!line.includes(label)) {
      failures.push(`README project gallery: missing "${label}" filter (data has "${slug}")`)
    }
  }
  for (const [slug, label] of Object.entries(slugToLabel)) {
    if (line.includes(label) && !categorySlugs.has(slug)) {
      failures.push(
        `README project gallery: lists "${label}" but no project has type "${slug}" anymore`
      )
    }
  }
}

// ─── Locale count claim ─────────────────────────────────────────────────────
const nuxtLocales = [...nuxtConfigSrc.matchAll(/\{\s*code:\s*['"][\w-]+['"]/g)]
const localeCount = nuxtLocales.length
const localeWords = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten'
]
const claimedLocales = (readme.match(/\*\*(\w+) locales:\*\*/) || [])[1]
if (!claimedLocales) {
  failures.push('README: "**N locales:**" bullet not found')
} else if (claimedLocales !== localeWords[localeCount]) {
  failures.push(
    `README locales: claims "${claimedLocales}" but nuxt.config.ts has ${localeCount} (would be "${localeWords[localeCount]}")`
  )
}

// ─── Prerendered routes claim ──────────────────────────────────────────────
// "- **N prerendered routes:** M per locale via static-site generation"
const routesMatch = readme.match(/\*\*(\d+) prerendered routes:\*\* (\d+) per locale/)
if (!routesMatch) {
  failures.push('README: "**N prerendered routes:** M per locale" bullet not found')
} else {
  const [, totalStr, perLocaleStr] = routesMatch
  const total = parseInt(totalStr, 10)
  const perLocale = parseInt(perLocaleStr, 10)
  if (total !== perLocale * localeCount) {
    failures.push(
      `README routes math: ${perLocale} per locale × ${localeCount} locales = ${perLocale * localeCount}, but README claims ${total}`
    )
  }
  // Note: the actual rendered count comes from `nuxt generate` output. This
  // check only verifies internal consistency (math); a precise check would
  // need to parse the .output/public/ tree after a build. Worth wiring into
  // the build-check ci.yml job later if the routes count starts drifting.
}

// ─── Report ────────────────────────────────────────────────────────────────
if (failures.length > 0) {
  console.error('README claim drift detected:\n')
  for (const f of failures) console.error('  - ' + f)
  console.error(
    '\nFix: update README.md or the data file so they agree. See scripts/check-readme-claims.mjs for the fragile-claim registry.'
  )
  process.exit(1)
}
console.log(`README claims pass (${typeBlocks.length} projects, ${localeCount} locales).`)
