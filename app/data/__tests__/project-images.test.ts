import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { projects } from '../projects'

const PUBLIC = fileURLToPath(new URL('../../../public/', import.meta.url))

// A mistyped image path still builds; the card or modal just shows a broken image.
describe('project images', () => {
  it('every cover and screenshot path names a file under public/', () => {
    const paths = projects.flatMap((p) => [p.thumbnailUrl, ...(p.screenshots ?? [])])
    for (const path of paths.filter((p): p is string => Boolean(p))) {
      expect(existsSync(PUBLIC + path.replace(/^\//, '')), path).toBe(true)
    }
  })

  it('every cover is an illustrated cover, never a screenshot', () => {
    for (const p of projects) expect(p.thumbnailUrl ?? '', p.id).not.toContain('/screenshots/')
  })
})
