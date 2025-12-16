import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperienceTimeline from '../ExperienceTimeline.vue'
import TimelineEntry from '../TimelineEntry.vue'
import type { TimelineEntry as TimelineEntryType } from '~/types'

const mockEntries: TimelineEntryType[] = [
  {
    id: 'entry-1',
    type: 'professional',
    title: 'Senior Developer',
    subtitle: 'Engineering Team',
    organization: 'Tech Corp',
    timeframe: 'Jan 2024 – Present',
    description: 'Leading development projects.',
    skills: ['TypeScript', 'Vue', 'AWS'],
    icon: 'work',
    isCurrent: true,
    sortDate: '2024-01-01'
  },
  {
    id: 'entry-2',
    type: 'education',
    title: 'Master of Science',
    subtitle: 'Computer Science',
    organization: 'University',
    timeframe: 'Aug 2022 – Dec 2023',
    description: 'Graduate studies in CS.',
    skills: ['Machine Learning', 'Algorithms'],
    icon: 'education',
    isCurrent: false,
    sortDate: '2022-08-01'
  },
  {
    id: 'entry-3',
    type: 'professional',
    title: 'Junior Developer',
    subtitle: 'Development Team',
    organization: 'Startup Inc',
    timeframe: 'Jun 2021 – Jul 2022',
    description: 'Full-stack development.',
    skills: ['React', 'Node.js'],
    icon: 'work',
    isCurrent: false,
    sortDate: '2021-06-01'
  }
]

describe('ExperienceTimeline', () => {
  it('renders all timeline entries', () => {
    const wrapper = mount(ExperienceTimeline, {
      props: { entries: mockEntries },
      global: {
        components: { TimelineEntry }
      }
    })

    const entries = wrapper.findAllComponents(TimelineEntry)
    expect(entries).toHaveLength(3)
  })

  it('renders entries in the order provided', () => {
    const wrapper = mount(ExperienceTimeline, {
      props: { entries: mockEntries },
      global: {
        components: { TimelineEntry }
      }
    })

    const titles = wrapper.findAll('h3')
    expect(titles.at(0)?.text()).toContain('Senior Developer')
    expect(titles.at(1)?.text()).toContain('Master of Science')
    expect(titles.at(2)?.text()).toContain('Junior Developer')
  })

  it('displays "Current" badge for active positions', () => {
    const wrapper = mount(ExperienceTimeline, {
      props: { entries: mockEntries },
      global: {
        components: { TimelineEntry }
      }
    })

    const currentBadges = wrapper.findAll('[role="status"]')
    expect(currentBadges).toHaveLength(1)
    expect(currentBadges.at(0)?.text()).toBe('Current')
  })

  it('does not display "Current" badge for past positions', () => {
    const pastEntries = mockEntries.filter((e) => !e.isCurrent)
    const wrapper = mount(ExperienceTimeline, {
      props: { entries: pastEntries },
      global: {
        components: { TimelineEntry }
      }
    })

    const currentBadges = wrapper.findAll('[role="status"]')
    expect(currentBadges).toHaveLength(0)
  })

  it('renders custom title when provided', () => {
    const wrapper = mount(ExperienceTimeline, {
      props: {
        entries: mockEntries,
        title: 'My Career Journey'
      },
      global: {
        components: { TimelineEntry }
      }
    })

    expect(wrapper.find('h2').text()).toBe('My Career Journey')
  })

  it('renders default title when not provided', () => {
    const wrapper = mount(ExperienceTimeline, {
      props: { entries: mockEntries },
      global: {
        components: { TimelineEntry }
      }
    })

    expect(wrapper.find('h2').text()).toBe('Experience & Education')
  })

  it('renders skill tags for entries', () => {
    const firstEntry = mockEntries[0]
    if (!firstEntry) throw new Error('Mock entry not found')

    const wrapper = mount(ExperienceTimeline, {
      props: { entries: [firstEntry] },
      global: {
        components: { TimelineEntry }
      }
    })

    const skillTags = wrapper.findAll('ul[aria-label="Skills"] li')
    expect(skillTags).toHaveLength(3)
    expect(skillTags.at(0)?.text()).toBe('TypeScript')
    expect(skillTags.at(1)?.text()).toBe('Vue')
    expect(skillTags.at(2)?.text()).toBe('AWS')
  })
})
