import type { ActivityHighlight } from '~/types'
import { publications } from './publications'
import { hackathons } from './hackathons'
import { conferences } from './conferences'

interface HighlightRef {
  kind: 'publication' | 'hackathon' | 'conference'
  id: string
  displayTitle?: string
  displayDescription?: string
}

const refs: HighlightRef[] = [
  {
    kind: 'publication',
    id: 'ieee-is-2026',
    displayTitle: 'IntelliFL: Metacognitive Federated Learning Framework'
  },
  { kind: 'publication', id: 'ijcnn-wcci-2026' },
  { kind: 'hackathon', id: 'hackerrank-orchestrate-2026' },
  {
    kind: 'hackathon',
    id: 'aware-ai-bioradio-2026',
    displayDescription:
      'Cosmic Ritual: BioRadio EMG gestures drive a real-time chord engine. Built the gesture classifier, MIDI engine, GUI music mode, and Zensical docs site.'
  },
  { kind: 'conference', id: 'ne-agents-day-2026' },
  { kind: 'conference', id: 'rit-aware-ai-poster-2026' }
]

const firstSentence = (text: string | undefined): string => {
  if (!text) return ''
  const match = text.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : text
}

const byId = <T extends { id: string }>(items: T[], id: string): T | undefined =>
  items.find((item) => item.id === id)

function resolve(ref: HighlightRef): ActivityHighlight | null {
  if (ref.kind === 'publication') {
    const p = byId(publications, ref.id)
    if (!p) return null
    return {
      id: p.id,
      kind: 'publication',
      title: ref.displayTitle ?? p.title,
      meta: `${p.venue} · ${p.year}`,
      description: ref.displayDescription ?? firstSentence(p.abstract),
      result: p.doi ? 'DOI' : p.status === 'accepted' ? 'Accepted' : undefined,
      url: p.url
    }
  }
  if (ref.kind === 'hackathon') {
    const h = byId(hackathons, ref.id)
    if (!h) return null
    const typeLabel = h.type === 'solo' ? 'Solo' : 'Team'
    return {
      id: h.id,
      kind: 'hackathon',
      title: ref.displayTitle ?? h.name,
      meta: `${typeLabel} · ${h.organizer} · ${h.date}`,
      description: ref.displayDescription ?? firstSentence(h.description),
      result: h.result,
      url: h.links.docs || h.links.repo || h.links.linkedin
    }
  }
  const c = byId(conferences, ref.id)
  if (!c) return null
  const formatLabel = c.format.charAt(0).toUpperCase() + c.format.slice(1)
  return {
    id: c.id,
    kind: 'conference',
    title: ref.displayTitle ?? c.title,
    meta: `${formatLabel} · ${c.name} · ${c.date}`,
    description: ref.displayDescription ?? firstSentence(c.description),
    url: c.writeupUrl || c.eventUrl
  }
}

export const activityHighlights: ActivityHighlight[] = refs
  .map(resolve)
  .filter((h): h is ActivityHighlight => h !== null)
