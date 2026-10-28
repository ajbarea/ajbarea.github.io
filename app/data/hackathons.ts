import type { Hackathon } from '~/types'

export const hackathons: Hackathon[] = [
  {
    id: 'aware-ai-fall-2026',
    name: 'AWARE-AI Fall Hackathon (Myo Lever Controller)',
    organizer: 'RIT AWARE-AI',
    date: 'Oct 2026',
    type: 'team',
    technologies: [
      'Python',
      'Myo armband (EMG/IMU)',
      'Lab Streaming Layer',
      'NumPy',
      'PyTorch',
      'WebSocket',
      'Zensical'
    ],
    links: {
      repo: 'https://github.com/ajbarea/Hackathon',
      docs: 'https://ajbarea.github.io/Hackathon/'
    }
  },
  {
    id: 'hackerrank-orchestrate-2026',
    name: 'HackerRank Orchestrate',
    organizer: 'HackerRank',
    date: 'May 2026',
    durationHours: 24,
    type: 'solo',
    technologies: ['Claude Opus', 'Anthropic Message Batches API', 'Python', 'Pydantic', 'uv'],
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
      repo: 'https://github.com/ajbarea/bioradio-music',
      docs: 'https://ajbarea.github.io/bioradio-music/',
      linkedin:
        'https://www.linkedin.com/posts/aj-barea_hackathon-appliedai-hci-share-7433372743804375040-QAOy'
    }
  }
]
