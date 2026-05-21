import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectModal from '../ProjectModal.vue'
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

// Vue 3 <Teleport> renders to document.body in real apps. For unit tests
// we stub it as a passthrough so the dialog markup lives inside the
// wrapper and is findable by @vue/test-utils selectors. The lowercase
// `teleport: false` syntax from older Vue test-utils versions doesn't
// take effect on Vue 3's built-in <Teleport>, so we provide an explicit
// stub with the same component name (PascalCase).
const TeleportStub = {
  name: 'Teleport',
  props: ['to'],
  template: '<div><slot /></div>'
}

function makeWrapper(props: { project: Project | null; open: boolean }) {
  return mount(ProjectModal, {
    props,
    global: { stubs: { Teleport: TeleportStub } }
  })
}

describe('ProjectModal', () => {
  it('renders nothing when open=false', () => {
    const wrapper = makeWrapper({ project: mockProject, open: false })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders nothing when project is null', () => {
    const wrapper = makeWrapper({ project: null, open: true })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders the dialog with required a11y attributes when open', () => {
    const wrapper = makeWrapper({ project: mockProject, open: true })
    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(dialog.attributes('aria-labelledby')).toMatch(/^project-modal-title-/)
    expect(dialog.attributes('aria-describedby')).toMatch(/^project-modal-desc-/)
  })

  it('renders the project title (linked to aria-labelledby)', () => {
    const wrapper = makeWrapper({ project: mockProject, open: true })
    const dialog = wrapper.find('[role="dialog"]')
    const labelledBy = dialog.attributes('aria-labelledby')!
    const title = wrapper.find(`#${labelledBy}`)
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Kourai Khryseai')
  })

  it('renders the FULL description, not a clamped excerpt', () => {
    const wrapper = makeWrapper({ project: mockProject, open: true })
    const dialog = wrapper.find('[role="dialog"]')
    const describedBy = dialog.attributes('aria-describedby')!
    const desc = wrapper.find(`#${describedBy}`)
    expect(desc.exists()).toBe(true)
    // No line-clamp class on the description in the modal.
    expect(desc.classes().some((c) => c.startsWith('line-clamp'))).toBe(false)
  })

  it('renders ALL technology tags (no +N truncation)', () => {
    const wrapper = makeWrapper({ project: mockProject, open: true })
    const techSection = wrapper.find('section')
    expect(techSection.exists()).toBe(true)
    // Every tech string from the project data must appear.
    for (const tech of mockProject.technologies) {
      expect(techSection.text()).toContain(tech)
    }
    // No "+N" overflow indicator.
    expect(techSection.text()).not.toMatch(/\+\d+/)
  })

  it('renders action buttons only for URLs present on the project', () => {
    const wrapper = makeWrapper({ project: mockProject, open: true })
    const links = wrapper.findAll('nav a')
    // mockProject has docsUrl + githubUrl, no demoUrl, no youtubeUrl.
    expect(links).toHaveLength(2)
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('https://example.com/docs/')
    expect(hrefs).toContain('https://github.com/example/kourai-khryseai')
  })

  it('emits update:open=false when the close button is clicked', async () => {
    const wrapper = makeWrapper({ project: mockProject, open: true })
    const closeBtn = wrapper.find('button[aria-label]')
    await closeBtn.trigger('click')
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  })

  it('emits update:open=false when the backdrop is clicked', async () => {
    const wrapper = makeWrapper({ project: mockProject, open: true })
    // The outermost click-target div in the modal carries .self click handler.
    const outer = wrapper.find('.fixed.inset-0.z-50')
    await outer.trigger('click')
    expect(wrapper.emitted('update:open')).toEqual([[false]])
  })
})
