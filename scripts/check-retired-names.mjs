#!/usr/bin/env node
/**
 * Fail if a retired project name appears in site content.
 *
 * "IntelliFL" belongs to another group; ours is "InteFL". Lowercase slugs,
 * ids, and asset filenames (`intellifl`) are internal and allowed; the match
 * is case-sensitive on purpose.
 *
 * Run locally: node scripts/check-retired-names.mjs
 * Exit codes: 0 = clean, 1 = at least one hit.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, extname, relative, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const RETIRED = [{ name: 'IntelliFL', use: 'InteFL' }]
const SCAN_DIRS = ['app', 'content', 'i18n', 'public', 'server']
const SCAN_FILES = ['README.md', 'nuxt.config.ts', 'scripts/auto-translate.mjs']
const TEXT_EXT = new Set([
  '.ts',
  '.vue',
  '.json',
  '.md',
  '.mjs',
  '.js',
  '.txt',
  '.html',
  '.xml',
  '.yml'
])

function walk(dir, out) {
  for (const entry of readdirSync(dir)) {
    const path = resolve(dir, entry)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (TEXT_EXT.has(extname(path))) out.push(path)
  }
  return out
}

const files = [
  ...SCAN_DIRS.flatMap((d) => walk(resolve(root, d), [])),
  ...SCAN_FILES.map((f) => resolve(root, f))
]

const failures = []
for (const file of files) {
  const lines = readFileSync(file, 'utf-8').split('\n')
  lines.forEach((line, i) => {
    for (const { name, use } of RETIRED) {
      if (line.includes(name))
        failures.push(`${relative(root, file)}:${i + 1}: "${name}" -> use "${use}"`)
    }
  })
}

if (failures.length) {
  console.error(`Retired names found (${failures.length}):`)
  for (const f of failures) console.error(`  ${f}`)
  process.exit(1)
}
console.log(`Retired-name check: ${files.length} files clean.`)
