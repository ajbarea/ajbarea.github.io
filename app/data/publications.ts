import type { Publication, Presentation } from '~/types'

export const publications: Publication[] = [
  {
    id: 'ieee-ccnc-2026',
    authors: ['AJ Barea', 'TBD'],
    title: 'IntelliFL: Intelligent Client Selection for Federated Learning',
    venue: 'IEEE Consumer Communications & Networking Conference (CCNC)',
    year: 2026,
    status: 'under-review',
  },
  {
    id: 'intellifl-framework-1',
    authors: ['AJ Barea', 'TBD'],
    title: 'Privacy-Preserving Aggregation in Federated Learning Systems',
    venue: 'TBD',
    year: 2025,
    status: 'under-review',
  },
  {
    id: 'intellifl-framework-2',
    authors: ['AJ Barea', 'TBD'],
    title: 'Testing Strategies for Distributed Machine Learning Systems',
    venue: 'TBD',
    year: 2025,
    status: 'under-review',
  },
]

export const presentations: Presentation[] = [
  {
    id: 'youtube-aiml-tutorials',
    title: 'AI/ML Tutorial Series',
    venue: 'YouTube (@ajbarea)',
    date: '2024-Present',
    type: 'tutorial',
    url: 'https://youtube.com/@ajbarea',
  },
]

export const publicationsByStatus = {
  published: publications.filter((p) => p.status === 'published'),
  'under-review': publications.filter((p) => p.status === 'under-review'),
  accepted: publications.filter((p) => p.status === 'accepted'),
}
