import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../ProjectCard.vue'
import type { Project } from '~/types'

const mockProject: Project = {
  id: 'kourai-khryseai',
  title: 'Kourai Khryseai',
  technologies: ['Python', 'A2A Protocol', 'MCP', 'OpenTelemetry', 'Jaeger', 'Prometheus', 'pygame'],
  types: ['ai-ml', 'full-stack'],
  thumbnailUrl: 'https://example.com/thumb.webp',
  docsUrl: 'https://example.com/docs/',
  githubUrl: 'https://github.com/example/kourai-khryseai'
}

// ProjectModal is teleported to body and uses @vueuse/core helpers we don't
// need to exercise in the card's unit tests; stub it down to the bare
// observable surface — `open` prop + `update:open` event.
const ProjectModalStub = {
  name: 'ProjectModal',
  props: ['project', 'open'],
  emits: ['update:open'],
  template:
    '<div data-test="modal-stub" :data-open="open">{{ project ? project.id : "none" }}</div>'
}

function makeWrapper(project: Project = mockProject) {
  return mount(ProjectCard, {
    props: { project },
    global: { stubs: { ProjectModal: ProjectModalStub } }
  })
}

describe('ProjectCard', () => {
  it('renders the project title from i18n', () => {
    const wrapper = makeWrapper()
    expect(wrapper.text()).toContain('Kourai Khryseai')
  })

  it('renders the description (1- to 2-line teaser from i18n)', () => {
    const wrapper = makeWrapper()
    // The en.json description for kourai-khryseai starts with this phrase.
    expect(wrapper.text()).toContain('Interactive multi-agent development system')
  })

  it('does NOT render the technology tags on the card (they live in the modal)', () => {
    const wrapper = makeWrapper()
    // None of the tech tag strings should appear in the card body, only in the modal.
    expect(wrapper.text()).not.toContain('Python')
    expect(wrapper.text()).not.toContain('OpenTelemetry')
  })

  it('does NOT render action buttons on the card (they live in the modal)', () => {
    const wrapper = makeWrapper()
    // No Demo / Docs / GitHub / Video text on the card itself.
    expect(wrapper.text()).not.toContain('Demo')
    expect(wrapper.text()).not.toContain('Docs')
    expect(wrapper.text()).not.toContain('GitHub')
  })

  it('renders the title as a button (not a link) with aria-haspopup=dialog', () => {
    const wrapper = makeWrapper()
    const titleBtn = wrapper.find('button.project-card__title')
    expect(titleBtn.exists()).toBe(true)
    expect(titleBtn.attributes('aria-haspopup')).toBe('dialog')
    expect(titleBtn.attributes('aria-label')).toContain('Kourai Khryseai')
  })

  it('opens the modal when the title button is clicked', async () => {
    const wrapper = makeWrapper()
    const modal = wrapper.find('[data-test="modal-stub"]')
    expect(modal.attributes('data-open')).toBe('false')

    await wrapper.find('button.project-card__title').trigger('click')
    expect(modal.attributes('data-open')).toBe('true')
  })

  it('closes the modal when the child emits update:open=false', async () => {
    const wrapper = makeWrapper()
    await wrapper.find('button.project-card__title').trigger('click')
    const modal = wrapper.findComponent(ProjectModalStub)
    expect(modal.props('open')).toBe(true)

    await modal.vm.$emit('update:open', false)
    await wrapper.vm.$nextTick()
    expect(modal.props('open')).toBe(false)
  })

  it('still renders type badges on the card thumbnail', () => {
    const wrapper = makeWrapper()
    // The two type badges from mockProject.types should render text from i18n.
    const badges = wrapper.findAll('.absolute.top-3.right-3 span')
    expect(badges.length).toBe(2)
  })

  it('renders the thumbnail image when thumbnailUrl is provided', () => {
    const wrapper = makeWrapper()
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/thumb.webp')
  })

  it('falls back to placeholder icon when image fails to load', async () => {
    const wrapper = makeWrapper()
    await wrapper.find('img').trigger('error')
    // Image is gone; fallback svg path is rendered.
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
