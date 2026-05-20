import type { Conference } from '~/types'

export const conferences: Conference[] = [
  {
    id: 'ne-agents-day-2026',
    name: 'NE Agents Day 2026',
    fullName: 'North-East AI Agents Day 2026',
    venue: 'Jane Street, New York, NY',
    date: 'May 8, 2026',
    format: 'poster',
    title: 'Kourai Khryseai: Transparent Human-on-the-Loop Multi-Agent Software Development',
    description:
      'Reframes multi-agent coding as an interpretability problem via three pillars: Monitor (OpenTelemetry / Jaeger / Prometheus observability), Communicate (agents request clarification on ambiguous requirements), and Control (bounded repair loops for deliberate recovery). Demonstrates Hephaestus, an orchestrator routing to specialist agents over MCP with shared SQLite state.',
    writeupUrl: 'https://ajbarea.github.io/kourai-khryseai/research/ne-agents-day-2026/',
    eventUrl: 'https://ne-agents-day.github.io/'
  },
  {
    id: 'rit-aware-ai-poster-2026',
    name: 'RIT AWARE-AI Research Poster Session 2026',
    venue: 'Student Innovation Hall 1600 Atrium, RIT, Rochester, NY',
    date: 'April 15, 2026',
    format: 'poster',
    title: 'Narrative Interfaces for Multi-Agent Software Development',
    description:
      "Examines how embodiment, voice, and Ren'Py visual-novel framing affect how users supervise and redirect multi-agent software. Justifies the three-host interface architecture (terminal REPL, pygame GUI with TTS, Ren'Py VN) underlying Kourai Khryseai.",
    posterNumber: '#26',
    writeupUrl:
      'https://ajbarea.github.io/kourai-khryseai/research/chai-2026-narrative-interfaces/',
    eventUrl: 'https://www.rit.edu/events/chai-research-poster-session-1'
  }
]
