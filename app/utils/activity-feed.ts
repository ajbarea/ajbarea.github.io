// Pure builder for the activity feed (/rss.xml + /atom.xml). Kept free of any
// Vue/Nuxt runtime so a Nitro server route and Vitest can both call it: it
// takes the structured data arrays plus the loaded en.json messages (a server
// route has no useI18n()) and returns sorted feed items. Dates are built in
// UTC so output is deterministic regardless of the build machine's timezone.
import type { Conference, Hackathon, Publication } from '~/types'

export interface FeedMessages {
  publications?: Record<string, { title?: string; abstract?: string }>
  hackathons?: Record<string, { description?: string; result?: string }>
  conferences?: Record<string, { title?: string; description?: string }>
}

export interface ActivityFeedItem {
  id: string
  title: string
  link: string
  description: string
  date: Date
  category: 'publication' | 'hackathon' | 'conference'
}

export interface BuildActivityItemsInput {
  messages: FeedMessages
  publications: Publication[]
  hackathons: Hackathon[]
  conferences: Conference[]
  siteUrl: string
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

// Normalise the heterogeneous date strings the data uses ("May 8, 2026",
// "Feb 2026", or a bare year) into a UTC Date. Year-only values anchor to
// Jan 1 of that year. Unparseable input degrades to the epoch rather than
// throwing, so one bad entry can't break the whole feed.
export function parseActivityDate(value: string | number): Date {
  if (typeof value === 'number') return new Date(Date.UTC(value, 0, 1))
  const s = value.trim()

  const year = /^(\d{4})$/.exec(s)
  if (year) return new Date(Date.UTC(Number(year[1]), 0, 1))

  const fullDate = /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/.exec(s)
  if (fullDate) {
    const month = MONTHS.indexOf(fullDate[1].slice(0, 3).toLowerCase())
    if (month >= 0) return new Date(Date.UTC(Number(fullDate[3]), month, Number(fullDate[2])))
  }

  const monthYear = /^([A-Za-z]+)\s+(\d{4})$/.exec(s)
  if (monthYear) {
    const month = MONTHS.indexOf(monthYear[1].slice(0, 3).toLowerCase())
    if (month >= 0) return new Date(Date.UTC(Number(monthYear[2]), month, 1))
  }

  const parsed = Date.parse(s)
  return Number.isNaN(parsed) ? new Date(0) : new Date(parsed)
}

// Aggregate publications + hackathons + conferences into feed items, resolving
// human-readable titles/descriptions from the locale messages (falling back to
// the structured id/name), then sort newest-first.
export function buildActivityItems(input: BuildActivityItemsInput): ActivityFeedItem[] {
  const { messages, publications, hackathons, conferences } = input
  const base = input.siteUrl.replace(/\/$/, '')
  const items: ActivityFeedItem[] = []

  for (const p of publications) {
    const msg = messages.publications?.[p.id]
    items.push({
      id: `${base}/#${p.id}`,
      title: msg?.title ?? p.id,
      link: p.url ?? `${base}/#publications`,
      description: msg?.abstract ?? '',
      date: parseActivityDate(p.year),
      category: 'publication'
    })
  }

  for (const h of hackathons) {
    const msg = messages.hackathons?.[h.id]
    items.push({
      id: `${base}/#${h.id}`,
      title: h.name,
      link: h.links.docs ?? h.links.repo ?? h.links.event ?? h.links.linkedin ?? `${base}/`,
      description: msg?.description ?? '',
      date: parseActivityDate(h.date),
      category: 'hackathon'
    })
  }

  for (const c of conferences) {
    const msg = messages.conferences?.[c.id]
    items.push({
      id: `${base}/#${c.id}`,
      title: msg?.title ?? c.name,
      link: c.writeupUrl ?? c.eventUrl ?? `${base}/`,
      description: msg?.description ?? '',
      date: parseActivityDate(c.date),
      category: 'conference'
    })
  }

  return items.sort((a, b) => b.date.getTime() - a.date.getTime())
}
