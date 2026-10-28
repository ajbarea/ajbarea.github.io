import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TheFooter from '../TheFooter.vue'

const stubs = { UiOrcidIcon: true, UiScholarIcon: true }

describe('TheFooter', () => {
  it('reads "<year> <brand mark> AJ Barea" then links this site’s repo', () => {
    const wrapper = mount(TheFooter, { global: { stubs } })
    const line = wrapper.find('footer p')
    expect(line.text()).toMatch(/^\d{4}\s+AJ Barea$/)
    expect(line.find('img[src="/images/brand.png"]').exists()).toBe(true)
    const repo = line.find('a')
    expect(repo.attributes('href')).toBe('https://github.com/ajbarea/ajbarea.github.io')
    expect(repo.attributes('aria-label')).toBe('Source code of this site on GitHub')
    expect(repo.attributes('rel')).toContain('noopener')
  })

  it('names no team and carries no copyright sign or licence text', () => {
    const text = mount(TheFooter, { global: { stubs } }).text()
    expect(text).not.toMatch(/©|\(c\)|license|licence|MIT/i)
  })
})
