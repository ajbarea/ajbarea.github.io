import type { Hackathon } from '~/types'

export const hackathons: Hackathon[] = [
  {
    id: 'hackerrank-orchestrate-2026',
    name: 'HackerRank Orchestrate',
    organizer: 'HackerRank',
    date: 'May 2026',
    durationHours: 24,
    type: 'solo',
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
