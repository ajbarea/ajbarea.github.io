#!/usr/bin/env node
// Translate i18n/locales/en.json into a target locale via local Ollama + Qwen2.5.
// Usage:
//   node scripts/auto-translate.mjs --target {es|ja|zh}
//   node scripts/auto-translate.mjs --target es --fresh   # ignore existing draft, retranslate everything
// Outputs i18n/locales/{target}.draft.json. Resumable: re-running fills in missing keys only.
// To verify an existing locale, run --fresh and diff against the committed file.

import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const LOCALES = resolve(ROOT, 'i18n/locales')

const LANG_NAMES = {
  es: 'Spanish (Latin-American neutral, informal tú, masculine)',
  ja: 'Japanese (polite desu-masu form for UI strings)',
  zh: 'Simplified Chinese (Mainland conventions, neutral register)'
}

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434'
const MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b-instruct'

function systemPrompt(targetLang) {
  return `You are a UI string translator for a software portfolio website. Translate English to ${LANG_NAMES[targetLang]}.

STRICT OUTPUT RULES:
1. Reply with ONLY the translated string. No commentary, no quotes wrapping your answer, no preamble like "The translation is:".
2. Preserve all placeholders like {name}, {title}, {category}, {mode} EXACTLY. Never translate the words inside braces.
3. Preserve the special vue-i18n escape {'@'} EXACTLY (it renders as a literal @ symbol).
4. Preserve proper nouns: AJ Barea, RIT, IEEE, NC State, HackerRank, Claude, IntelliFL, PyTorch, Federated Learning, Kourai Khryseai, BioRadio, MCP, SQLite, OpenTelemetry, Jaeger, Prometheus, etc.
5. Preserve initialisms (MS, PhD, GPA, RDC, SOP, SQL, CI, FL, AI, ML, NLP, RL, DQN, MIDI, EMG, EEG, GUI, CLI, REPL, VN, TTS) unless the target language has an established native form.
6. If the source is a single word or short label, the output must be a single word or short label of equivalent register (button text stays button text).
7. Punctuation and capitalization: follow the target language's conventions, not English's.`
}

async function callOllama(source, targetLang) {
  const res = await fetch(`${OLLAMA_HOST}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      system: systemPrompt(targetLang),
      prompt: source,
      stream: false,
      options: { temperature: 0.1, top_p: 0.9, num_predict: 4000 }
    })
  })
  if (!res.ok) throw new Error(`Ollama HTTP ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.response
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .trim()
}

const PLACEHOLDER_RE = /\{[^{}]*\}/g

function placeholders(s) {
  return new Set((s.match(PLACEHOLDER_RE) || []).map((p) => p))
}

function validate(source, target) {
  const src = placeholders(source)
  const tgt = placeholders(target)
  if (src.size !== tgt.size) return `placeholder count: ${src.size} vs ${tgt.size}`
  for (const p of src) if (!tgt.has(p)) return `missing placeholder ${p}`
  // Heuristic: if Qwen echoed the source string back inside a longer commentary
  // ("The translation of 'X' is 'Y'."), reject. Skip for very short sources where
  // the target may legitimately contain the source word (e.g. proper nouns).
  if (source.length >= 8 && target.includes(source) && target.length > source.length * 1.5) {
    return `target contains source verbatim with extra wrapping`
  }
  return null
}

async function translate(source, targetLang, path) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    let result
    try {
      result = await callOllama(source, targetLang)
    } catch (err) {
      console.warn(`  ${path} attempt ${attempt} HTTP error: ${err.message}`)
      if (attempt === 3) throw err
      continue
    }
    const reason = validate(source, result)
    if (!reason) return result
    console.warn(`  ${path} attempt ${attempt} rejected (${reason}); retrying`)
  }
  throw new Error(`${path}: failed after 3 attempts`)
}

function shortPreview(s) {
  const flat = s.replace(/\s+/g, ' ').slice(0, 70)
  return flat.length < s.length ? `${flat}...` : flat
}

async function walk(source, existing, targetLang, path) {
  if (Array.isArray(source)) {
    const out = []
    for (let i = 0; i < source.length; i++) {
      const childPath = `${path}[${i}]`
      const existingItem = Array.isArray(existing) ? existing[i] : undefined
      if (typeof source[i] === 'string') {
        if (existingItem != null) {
          out.push(existingItem)
        } else {
          const result = await translate(source[i], targetLang, childPath)
          console.log(`  ${childPath} → ${shortPreview(result)}`)
          out.push(result)
        }
      } else {
        out.push(await walk(source[i], existingItem, targetLang, childPath))
      }
    }
    return out
  }
  if (typeof source === 'object' && source !== null) {
    const out = {}
    for (const key of Object.keys(source)) {
      const childPath = path ? `${path}.${key}` : key
      out[key] = await walk(source[key], existing?.[key], targetLang, childPath)
    }
    return out
  }
  if (typeof source === 'string') {
    if (existing != null) return existing
    const result = await translate(source, targetLang, path)
    console.log(`  ${path} → ${shortPreview(result)}`)
    return result
  }
  return source
}

async function pingOllama() {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    const found = (data.models || []).find((m) => m.name === MODEL)
    if (!found) {
      throw new Error(`model ${MODEL} not pulled. Run: ollama pull ${MODEL}`)
    }
  } catch (err) {
    throw new Error(`Ollama not reachable at ${OLLAMA_HOST}: ${err.message}`)
  }
}

async function main() {
  const args = process.argv.slice(2)
  const targetIdx = args.indexOf('--target')
  if (targetIdx === -1 || !args[targetIdx + 1]) {
    console.error('Usage: node scripts/auto-translate.mjs --target {es|ja|zh} [--fresh]')
    process.exit(1)
  }
  const target = args[targetIdx + 1]
  const fresh = args.includes('--fresh')
  if (!LANG_NAMES[target]) {
    console.error(`Unknown target: ${target}. Choose one of ${Object.keys(LANG_NAMES).join(', ')}`)
    process.exit(1)
  }

  await pingOllama()

  const source = JSON.parse(await readFile(resolve(LOCALES, 'en.json'), 'utf8'))
  const draftPath = resolve(LOCALES, `${target}.draft.json`)
  let existing = null
  if (!fresh && existsSync(draftPath)) {
    existing = JSON.parse(await readFile(draftPath, 'utf8'))
    console.log(`Resuming from ${target}.draft.json (filling missing keys only)`)
  } else if (fresh) {
    console.log(`--fresh: ignoring any existing ${target}.draft.json`)
  }

  console.log(`Translating en → ${LANG_NAMES[target]} via ${MODEL}\n`)
  const start = Date.now()
  const out = await walk(source, existing, target, '')
  const elapsedSec = ((Date.now() - start) / 1000).toFixed(1)

  await writeFile(draftPath, JSON.stringify(out, null, 2) + '\n', 'utf8')
  console.log(`\nWrote ${draftPath}`)
  console.log(`Elapsed: ${elapsedSec}s`)
  const existingFinal = resolve(LOCALES, `${target}.json`)
  if (existsSync(existingFinal)) {
    console.log(`\nVerify by diffing against your committed file:`)
    console.log(`  diff ${existingFinal} ${draftPath}`)
  } else {
    console.log(`\nReview the draft, then promote to ${target}.json when satisfied.`)
  }
}

main().catch((err) => {
  console.error(`\n${err.stack || err.message}`)
  process.exit(1)
})
