import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProjectCard from '../ProjectCard.vue'
import { useThemeStore } from '~/stores/theme'
import type { Project } from '~/types'

const mockProject: Project = {
  id: 'kourai-khryseai',
  title: 'Kourai Khryseai',
  technologies: [
    'Python',
    'A2A Protocol',
    'MCP',
    'OpenTelemetry',
    'Jaeger',
    'Prometheus',
    'pygame'
  ],
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
  beforeEach(() => {
    setActivePinia(createPinia())
  })

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

  it('does NOT render full-label action buttons on the card (those live in the modal)', () => {
    const wrapper = makeWrapper()
    // The Demo / Docs / GitHub / Video text labels render only in the
    // modal. The card carries compact icon-only indicator shortcuts
    // (covered by the next test), which expose URLs via aria-label
    // rather than visible text.
    expect(wrapper.text()).not.toContain('Demo')
    expect(wrapper.text()).not.toContain('Docs')
    expect(wrapper.text()).not.toContain('GitHub')
  })

  it('renders icon-only direct-link indicators on the thumbnail when URLs are present', () => {
    const wrapper = makeWrapper()
    const indicators = wrapper.findAll('a[aria-label]')
    // mockProject has docsUrl + githubUrl, no youtubeUrl → exactly two indicators.
    expect(indicators).toHaveLength(2)
    const hrefs = indicators.map((i) => i.attributes('href'))
    expect(hrefs).toContain('https://example.com/docs/')
    expect(hrefs).toContain('https://github.com/example/kourai-khryseai')
    indicators.forEach((i) => {
      expect(i.attributes('target')).toBe('_blank')
      expect(i.attributes('rel')).toContain('noopener')
    })
  })

  it('renders ALL THREE indicators (docs, github, youtube) when all URLs are present', () => {
    const wrapper = makeWrapper({
      ...mockProject,
      youtubeUrl: 'https://youtu.be/example'
    })
    const indicators = wrapper.findAll('a[aria-label]')
    expect(indicators).toHaveLength(3)
    const hrefs = indicators.map((i) => i.attributes('href'))
    expect(hrefs).toContain('https://example.com/docs/')
    expect(hrefs).toContain('https://github.com/example/kourai-khryseai')
    expect(hrefs).toContain('https://youtu.be/example')
  })

  it('orders indicators docs → github → youtube', () => {
    const wrapper = makeWrapper({
      ...mockProject,
      youtubeUrl: 'https://youtu.be/example'
    })
    const indicators = wrapper.findAll('a[aria-label]')
    expect(indicators[0]!.attributes('href')).toBe('https://example.com/docs/')
    expect(indicators[1]!.attributes('href')).toBe('https://github.com/example/kourai-khryseai')
    expect(indicators[2]!.attributes('href')).toBe('https://youtu.be/example')
  })

  it('renders NO indicators when no URL is present', () => {
    const wrapper = makeWrapper({
      ...mockProject,
      docsUrl: undefined,
      githubUrl: undefined,
      youtubeUrl: undefined
    })
    const indicators = wrapper.findAll('a[aria-label]')
    expect(indicators).toHaveLength(0)
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

  it('uses thumbnailUrlLight in light mode when provided', () => {
    const wrapper = makeWrapper({
      ...mockProject,
      thumbnailUrlLight: 'https://example.com/thumb-light.webp'
    })
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/thumb-light.webp')
  })

  it('uses thumbnailUrlDark in dark mode when provided', () => {
    const themeStore = useThemeStore()
    themeStore.resolvedTheme = 'dark'
    const wrapper = makeWrapper({
      ...mockProject,
      thumbnailUrlDark: 'https://example.com/thumb-dark.webp'
    })
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/thumb-dark.webp')
  })

  it('falls back to thumbnailUrl when the matching theme variant is undefined', () => {
    const themeStore = useThemeStore()
    themeStore.resolvedTheme = 'dark'
    // mockProject has thumbnailUrl but no thumbnailUrlDark — should fall back.
    const wrapper = makeWrapper()
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/thumb.webp')
  })
})
