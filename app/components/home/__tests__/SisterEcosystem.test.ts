import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SisterEcosystem from '../SisterEcosystem.vue'
import { sisters } from '~/data/sisters'

describe('SisterEcosystem', () => {
  it('renders the section heading and lead paragraph', () => {
    const wrapper = mount(SisterEcosystem)
    expect(wrapper.find('#sisters-heading').text()).toBe('Research Ecosystem')
    expect(wrapper.text()).toContain('A coordinated family of repos')
  })

  it('renders one card per sister from data/sisters.ts', () => {
    const wrapper = mount(SisterEcosystem)
    const cards = wrapper.findAll('li a')
    expect(cards).toHaveLength(sisters.length)
  })

  it('renders each sister name and description', () => {
    const wrapper = mount(SisterEcosystem)
    const html = wrapper.html()
    for (const sister of sisters) {
      expect(html).toContain(sister.url)
    }
    expect(wrapper.text()).toContain('Kourai Khryseai')
    expect(wrapper.text()).toContain('Phalanx-FL')
    expect(wrapper.text()).toContain('VelocityFL')
    expect(wrapper.text()).toContain('LDQIS Lab')
    expect(wrapper.text()).toContain('Techne')
    expect(wrapper.text()).toContain('Orchestrate Triage')
  })

  it('renders the role badge with localized label', () => {
    const wrapper = mount(SisterEcosystem)
    const text = wrapper.text()
    expect(text).toContain('Innovation')
    expect(text).toContain('Research')
    expect(text).toContain('Performance')
    expect(text).toContain('Governance')
    expect(text).toContain('Lab identity')
    expect(text).toContain('Applied')
  })

  it('links open in a new tab with security attributes', () => {
    const wrapper = mount(SisterEcosystem)
    const links = wrapper.findAll('li a')
    for (const link of links) {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    }
  })

  it('section has accessible label tied to the heading', () => {
    const wrapper = mount(SisterEcosystem)
    const section = wrapper.find('section')
    expect(section.attributes('aria-labelledby')).toBe('sisters-heading')
  })

  it('each card has an aria-label naming sister and role', () => {
    const wrapper = mount(SisterEcosystem)
    const links = wrapper.findAll('li a')
    for (const link of links) {
      const aria = link.attributes('aria-label') ?? ''
      expect(aria).toMatch(/role:/)
    }
  })
})
