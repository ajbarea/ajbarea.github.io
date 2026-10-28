import type { Conference } from '~/types'

export const conferences: Conference[] = [
  {
    id: 'rocissa-2026',
    name: 'Rochester Security Summit 2026',
    fullName: '2026 Rochester Security Summit (RocISSA)',
    venue: 'Rochester, NY',
    date: 'October 2026',
    format: 'talk',
    eventUrl: 'https://www.rochestersecurity.org/2026/day1/track-4/'
  },
  {
    id: 'fa-talk-rit-2026',
    name: 'Federated Agents talk',
    fullName: 'Federated Agents talk, Rochester Institute of Technology',
    venue: 'Rochester Institute of Technology, Rochester, NY',
    date: 'October 2026',
    format: 'talk',
    writeupUrl: 'https://ajbarea.github.io/talks/federated-agents/'
  },
  {
    id: 'ne-agents-day-2026',
    name: 'NE Agents Day 2026',
    fullName: 'North-East AI Agents Day 2026',
    venue: 'Jane Street, New York, NY',
    date: 'May 8, 2026',
    format: 'poster',
    writeupUrl: 'https://ajbarea.github.io/kourai-khryseai/research/ne-agents-day-2026/',
    eventUrl: 'https://ne-agents-day.github.io/'
  },
  {
    id: 'rit-chai-poster-2026',
    name: 'CHAI Research Poster Session 2026',
    fullName: 'RIT Center for Human-aware Artificial Intelligence Research Poster Session 2026',
    venue: 'Student Innovation Hall 1600 Atrium, RIT, Rochester, NY',
    date: 'April 15, 2026',
    format: 'poster',
    posterNumber: '#26',
    writeupUrl:
      'https://ajbarea.github.io/kourai-khryseai/research/chai-2026-narrative-interfaces/',
    eventUrl: 'https://www.rit.edu/events/chai-research-poster-session-1'
  }
]
