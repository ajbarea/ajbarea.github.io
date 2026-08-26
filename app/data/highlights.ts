export type HighlightKind = 'publication' | 'hackathon' | 'conference'

export interface HighlightRef {
  kind: HighlightKind
  id: string
}

export const activityHighlightRefs: HighlightRef[] = [
  // Interleaved by kind so the badge colors alternate (publication / hackathon /
  // conference) down the column instead of clustering two-of-each.
  { kind: 'publication', id: 'ieee-is-2026' },
  { kind: 'hackathon', id: 'hackerrank-orchestrate-2026' },
  { kind: 'conference', id: 'ne-agents-day-2026' },
  { kind: 'publication', id: 'ijcnn-wcci-2026' },
  { kind: 'hackathon', id: 'aware-ai-bioradio-2026' },
  { kind: 'conference', id: 'rit-chai-poster-2026' }
]
