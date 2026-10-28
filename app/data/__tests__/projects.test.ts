import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { projects } from '../projects'

// Read the raw JSON: an imported locale is compiled to message ASTs, where an empty string is still truthy.
const locales = ['en', 'es', 'ja', 'zh'].map((name) => ({
  name,
  messages: JSON.parse(readFileSync(resolve(process.cwd(), `i18n/locales/${name}.json`), 'utf8'))
}))

describe('projects data', () => {
  // The modal labels a codeUrl link with projects.<id>.codeLabel; a missing or empty key shows raw.
  it('gives every project with a codeUrl a non-empty codeLabel in each locale', () => {
    for (const p of projects.filter((p) => p.codeUrl)) {
      for (const { name, messages } of locales) {
        const label = messages.projects?.[p.id]?.codeLabel
        expect(
          typeof label === 'string' && label.trim().length > 0,
          `${name}: projects.${p.id}.codeLabel`
        ).toBe(true)
      }
    }
  })
})
