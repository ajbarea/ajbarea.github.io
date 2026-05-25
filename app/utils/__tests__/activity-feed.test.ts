import { describe, it, expect } from 'vitest'
import { buildActivityItems, parseActivityDate, type FeedMessages } from '../activity-feed'
import type { Conference, Hackathon, Publication } from '~/types'

/**
 * Unit tests for the activity-feed builder that powers /rss.xml + /atom.xml.
 * The builder is pure — it takes the structured data arrays plus the loaded
 * en.json messages (a Nitro server route can't call useI18n()) and returns
 * sorted feed items. Dates are built in UTC so assertions are deterministic.
 */

const messages: FeedMessages = {
  publications: { 'pub-a': { title: 'Pub A Title', abstract: 'Pub A abstract.' } },
  hackathons: { 'hack-a': { description: 'Hack A description.', result: 'Winner' } },
  conferences: { 'conf-a': { title: 'Conf A Title', description: 'Conf A description.' } }
}

const publications: Publication[] = [
  {
    id: 'pub-a',
    authors: ['X'],
    venue: 'Venue',
    year: 2026,
    status: 'accepted',
    url: 'https://example.com/pub-a'
  },
  { id: 'pub-missing', authors: ['Y'], venue: 'V2', year: 2025, status: 'under-review' }
]

const hackathons: Hackathon[] = [
  {
    id: 'hack-a',
    name: 'Hack A',
    organizer: 'Org',
    date: 'Feb 2026',
    type: 'solo',
    technologies: [],
    links: { repo: 'https://example.com/hack-a' }
  }
]

const conferences: Conference[] = [
  {
    id: 'conf-a',
    name: 'Conf A',
    venue: 'V',
    date: 'May 8, 2026',
    format: 'poster',
    eventUrl: 'https://example.com/conf-a'
  }
]

describe('parseActivityDate', () => {
  it('parses a 4-digit year (number or string) to Jan 1 UTC', () => {
    expect(parseActivityDate(2026).toISOString()).toBe('2026-01-01T00:00:00.000Z')
    expect(parseActivityDate('2025').toISOString()).toBe('2025-01-01T00:00:00.000Z')
  })

  it('parses "Mon YYYY" to the first of that month UTC', () => {
    expect(parseActivityDate('Feb 2026').toISOString()).toBe('2026-02-01T00:00:00.000Z')
  })

  it('parses "Month D, YYYY" to that exact day UTC', () => {
    expect(parseActivityDate('May 8, 2026').toISOString()).toBe('2026-05-08T00:00:00.000Z')
    expect(parseActivityDate('April 15, 2026').toISOString()).toBe('2026-04-15T00:00:00.000Z')
  })
})

describe('buildActivityItems', () => {
  const items = buildActivityItems({
    messages,
    publications,
    hackathons,
    conferences,
    siteUrl: 'https://site.test'
  })

  it('includes every publication, hackathon, and conference', () => {
    expect(items).toHaveLength(4)
    expect(items.map((i) => i.category).sort()).toEqual([
      'conference',
      'hackathon',
      'publication',
      'publication'
    ])
  })

  it('resolves titles + descriptions from messages, falling back to id/name', () => {
    const pubA = items.find((i) => i.id.endsWith('pub-a'))
    expect(pubA?.title).toBe('Pub A Title')
    expect(pubA?.description).toBe('Pub A abstract.')

    // hackathon title is the structured name, not an i18n key
    expect(items.find((i) => i.id.endsWith('hack-a'))?.title).toBe('Hack A')

    // no message entry -> title falls back to the id
    expect(items.find((i) => i.id.endsWith('pub-missing'))?.title).toBe('pub-missing')
  })

  it('prefers an external link and falls back to a site-anchored URL', () => {
    expect(items.find((i) => i.id.endsWith('pub-a'))?.link).toBe('https://example.com/pub-a')
    expect(items.find((i) => i.id.endsWith('pub-missing'))?.link).toBe(
      'https://site.test/#publications'
    )
  })

  it('sorts items newest-first by date', () => {
    const times = items.map((i) => i.date.getTime())
    expect(times).toEqual([...times].sort((a, b) => b - a))
  })

  it('builds stable guids anchored under the site URL', () => {
    expect(items.find((i) => i.id.endsWith('conf-a'))?.id).toBe('https://site.test/#conf-a')
  })
})
