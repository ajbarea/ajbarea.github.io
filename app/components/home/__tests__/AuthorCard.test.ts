import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AuthorCard from '../AuthorCard.vue'
import type { Profile } from '~/types'

// Mock TextScroller component to avoid animation complexity in tests
const TextScrollerStub = {
  name: 'TextScroller',
  props: ['texts'],
  template: '<span>{{ texts[0] }}</span>'
}

// Mock NuxtLink to avoid router dependency in unit tests
const NuxtLinkStub = {
  name: 'NuxtLink',
  props: ['to'],
  template: '<a :href="to"><slot /></a>'
}

const mockProfile: Profile = {
  name: 'Test User',
  title: 'Software Engineer',
  roles: ['Developer', 'Architect', 'Researcher'],
  summary: 'A test summary about the user.',
  profileImage: '/images/test-profile.jpg',
  contact: {
    email: 'test@example.com',
    phone: '(555) 123-4567',
    github: 'testuser',
    youtube: '@testuser'
  },
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/testuser',
      icon: 'github',
      label: 'GitHub'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/testuser',
      icon: 'linkedin',
      label: 'LinkedIn'
    },
    {
      platform: 'email',
      url: 'mailto:test@example.com',
      icon: 'email',
      label: 'Email'
    }
  ]
}

describe('AuthorCard', () => {
  it('renders profile name correctly', () => {
    const wrapper = mount(AuthorCard, {
      props: { profile: mockProfile },
      global: {
        stubs: { TextScroller: TextScrollerStub, NuxtLink: NuxtLinkStub }
      }
    })

    expect(wrapper.find('h1').text()).toBe('Test User')
  })

  it('renders profile summary', () => {
    const wrapper = mount(AuthorCard, {
      props: { profile: mockProfile },
      global: {
        stubs: { TextScroller: TextScrollerStub, NuxtLink: NuxtLinkStub }
      }
    })

    expect(wrapper.text()).toContain('A test summary about the user.')
  })

  it('renders all social links and email button', () => {
    const wrapper = mount(AuthorCard, {
      props: { profile: mockProfile },
      global: {
        stubs: { TextScroller: TextScrollerStub, NuxtLink: NuxtLinkStub }
      }
    })

    const socialLinks = wrapper.findAll('nav a')
    expect(socialLinks).toHaveLength(2)

    const emailButton = wrapper.find('nav button')
    expect(emailButton.exists()).toBe(true)
  })

  it('social links have correct href attributes', () => {
    const wrapper = mount(AuthorCard, {
      props: { profile: mockProfile },
      global: {
        stubs: { TextScroller: TextScrollerStub, NuxtLink: NuxtLinkStub }
      }
    })

    const links = wrapper.findAll('nav a')
    expect(links.at(0)?.attributes('href')).toBe('https://github.com/testuser')
    expect(links.at(1)?.attributes('href')).toBe('https://linkedin.com/in/testuser')
  })

  it('social links open in new tab with security attributes', () => {
    const wrapper = mount(AuthorCard, {
      props: { profile: mockProfile },
      global: {
        stubs: { TextScroller: TextScrollerStub, NuxtLink: NuxtLinkStub }
      }
    })

    const links = wrapper.findAll('nav a')
    links.forEach((link) => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  it('social links have accessible aria-labels', () => {
    const wrapper = mount(AuthorCard, {
      props: { profile: mockProfile },
      global: {
        stubs: { TextScroller: TextScrollerStub, NuxtLink: NuxtLinkStub }
      }
    })

    const links = wrapper.findAll('nav a')
    expect(links.at(0)?.attributes('aria-label')).toBe('GitHub')
    expect(links.at(1)?.attributes('aria-label')).toBe('LinkedIn')

    const emailButton = wrapper.find('nav button')
    expect(emailButton.attributes('aria-label')).toBe('Copy email address')
  })

  it('renders profile image with correct alt text', () => {
    const wrapper = mount(AuthorCard, {
      props: { profile: mockProfile },
      global: {
        stubs: { TextScroller: TextScrollerStub, NuxtLink: NuxtLinkStub }
      }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('Profile photo of Test User')
    expect(img.attributes('src')).toBe('/images/test-profile.jpg')
  })
})
