import { describe, it, expect } from 'vitest'
import { projects } from '../projects'
import en from '../../../i18n/locales/en.json'
import es from '../../../i18n/locales/es.json'
import ja from '../../../i18n/locales/ja.json'
import zh from '../../../i18n/locales/zh.json'

const locales = { en, es, ja, zh } as const

describe('projects data', () => {
  // The modal labels a codeUrl link with projects.<id>.codeLabel; a missing key renders raw.
  it('gives every project with a codeUrl a codeLabel in each locale', () => {
    for (const p of projects.filter((p) => p.codeUrl)) {
      for (const [name, messages] of Object.entries(locales)) {
        const entry = (messages.projects as Record<string, { codeLabel?: string }>)[p.id]
        expect(entry?.codeLabel, `${name}: projects.${p.id}.codeLabel`).toBeTruthy()
      }
    }
  })
})
