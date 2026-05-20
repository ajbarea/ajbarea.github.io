import type { Hackathon } from '~/types'

export const hackathons: Hackathon[] = [
  {
    id: 'hackerrank-orchestrate-2026',
    name: 'HackerRank Orchestrate',
    organizer: 'HackerRank',
    date: 'May 2026',
    durationHours: 24,
    type: 'solo',
    description:
      'Multi-domain support-triage agent: routes tickets across HackerRank, Claude, and Visa corpuses with corpus-grounded responses, async batching, and prompt-injection defense.',
    result: 'Rank 11 / 1349',
    metrics: [
      '100% on every graded column of the labeled sample (10 tickets)',
      '29/29 on the production batch in 4 minutes'
    ],
    technologies: ['Claude Opus', 'Anthropic Async Batch API', 'Python', 'Pydantic', 'uv'],
    links: {
      event: 'https://www.hackerrank.com/hackerrank-orchestrate-may26',
      repo: 'https://github.com/ajbarea/orchestrate-triage',
      docs: 'https://ajbarea.github.io/orchestrate-triage/',
      linkedin:
        'https://www.linkedin.com/posts/aj-barea_aiagents-claudeopus-llmops-share-7456492310047072256-DqLj'
    }
  },
  {
    id: 'aware-ai-bioradio-2026',
    name: 'AWARE-AI Spring Hackathon (BioRadio)',
    organizer: 'RIT AWARE-AI',
    date: 'Feb 2026',
    durationHours: 24,
    type: 'team',
    description:
      'Cosmic Ritual: BioRadio EMG gestures drive a real-time chord engine. Contributed the gesture classifier, MIDI engine (velocity sustain, non-blocking playback, O(1) chord lookup), GUI music mode, and the cosmic-horror themed Zensical docs site.',
    result: 'Best AI Model',
    technologies: [
      'Python',
      'MIDI',
      'BioRadio (EMG/EEG)',
      'Lab Streaming Layer',
      'Zensical',
      'Mermaid'
    ],
    links: {
      event: 'https://www.rit.edu/events/aware-ai-spring-hackathon-1',
      repo: 'https://github.com/victor-lockwood/Hackathon-2026-Cosmic-Horror',
      docs: 'https://victor-lockwood.github.io/Hackathon-2026-Cosmic-Horror/',
      linkedin:
        'https://www.linkedin.com/posts/aj-barea_hackathon-appliedai-hci-share-7433372743804375040-QAOy'
    }
  }
]
