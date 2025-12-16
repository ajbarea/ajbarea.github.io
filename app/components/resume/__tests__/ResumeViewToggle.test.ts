import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ResumeViewToggle from '../ResumeViewToggle.vue'
import { useResumeStore } from '~/stores/resume'

describe('ResumeViewToggle', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders both Industry and Research toggle buttons', () => {
    const wrapper = mount(ResumeViewToggle)

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(wrapper.text()).toContain('Industry')
    expect(wrapper.text()).toContain('Research')
  })

  it('defaults to Industry view being selected', () => {
    mount(ResumeViewToggle)
    const store = useResumeStore()

    expect(store.viewMode).toBe('industry')
    expect(store.isIndustryView).toBe(true)
    expect(store.isResearchView).toBe(false)
  })

  it('Industry button has aria-selected true by default', () => {
    const wrapper = mount(ResumeViewToggle)

    const buttons = wrapper.findAll('button')
    expect(buttons.at(0)?.attributes('aria-selected')).toBe('true')
    expect(buttons.at(1)?.attributes('aria-selected')).toBe('false')
  })

  it('switches to Research view when Research button is clicked', async () => {
    const wrapper = mount(ResumeViewToggle)
    const store = useResumeStore()

    const researchButton = wrapper.findAll('button').at(1)
    if (!researchButton) throw new Error('Research button not found')
    await researchButton.trigger('click')

    expect(store.viewMode).toBe('research')
    expect(store.isResearchView).toBe(true)
    expect(store.isIndustryView).toBe(false)
  })

  it('switches back to Industry view when Industry button is clicked', async () => {
    const wrapper = mount(ResumeViewToggle)
    const store = useResumeStore()

    // First switch to research
    store.setViewMode('research')
    await wrapper.vm.$nextTick()

    // Then click Industry button
    const industryButton = wrapper.findAll('button').at(0)
    if (!industryButton) throw new Error('Industry button not found')
    await industryButton.trigger('click')

    expect(store.viewMode).toBe('industry')
    expect(store.isIndustryView).toBe(true)
  })

  it('updates aria-selected attributes when view changes', async () => {
    const wrapper = mount(ResumeViewToggle)

    const buttons = wrapper.findAll('button')

    // Click Research button
    const researchBtn = buttons.at(1)
    if (!researchBtn) throw new Error('Research button not found')
    await researchBtn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(buttons.at(0)?.attributes('aria-selected')).toBe('false')
    expect(buttons.at(1)?.attributes('aria-selected')).toBe('true')
  })

  it('has proper accessibility attributes', () => {
    const wrapper = mount(ResumeViewToggle)

    const tablist = wrapper.find('[role="tablist"]')
    expect(tablist.exists()).toBe(true)
    expect(tablist.attributes('aria-label')).toBe('Resume view options')

    const buttons = wrapper.findAll('button')
    buttons.forEach((button) => {
      expect(button.attributes('role')).toBe('tab')
      expect(button.attributes('aria-controls')).toBe('resume-content')
    })
  })
})
