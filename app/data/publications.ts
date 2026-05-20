import type { Publication, Presentation } from '~/types'

export const publications: Publication[] = [
  {
    id: 'ieee-ccnc-2026',
    authors: [
      'Dmitrii Korobeinikov',
      'Sergei Chuprov',
      'Raman Zatsarenko',
      'Arnaldo Barea',
      'Leon Reznik'
    ],
    venue: 'IEEE Consumer Communications & Networking Conference (CCNC)',
    year: 2026,
    status: 'under-review',
    keywords: [
      'Federated Learning',
      'Medical Imaging',
      'Data Quality',
      'Signal-to-Noise Ratio',
      'Model Convergence'
    ]
  },
  {
    id: 'ieee-is-2026',
    authors: [
      'Dmitrii Korobeinikov',
      'Raman Zatsarenko',
      'Sergei Chuprov',
      'Arnaldo Barea',
      'Leon Reznik'
    ],
    venue: 'IEEE Intelligent Systems (PrePrints)',
    year: 2026,
    status: 'accepted',
    doi: '10.1109/MIS.2026.3658072',
    url: 'https://ieeexplore.ieee.org/document/11366920/',
    keywords: [
      'Federated Learning',
      'Metacognition',
      'Intelligent Systems',
      'Robust Aggregation',
      'AI Agent'
    ]
  },
  {
    id: 'ijcnn-wcci-2026',
    authors: [
      'Dmitrii Korobeinikov',
      'Arnaldo Barea',
      'Leon Reznik',
      'Raman Zatsarenko',
      'Sergei Chuprov',
      'Angel Peredo'
    ],
    venue: 'IJCNN 2026 (IEEE WCCI, Maastricht)',
    year: 2026,
    status: 'accepted',
    url: 'https://attend.ieee.org/wcci-2026/',
    keywords: [
      'Federated Learning',
      'AI-Assisted Design',
      'Trustworthy AI',
      'Robust Aggregation',
      'Adversarial Attacks',
      'Neural Networks'
    ]
  },
  {
    id: 'ieee-dsn-2026',
    authors: [
      'Dmitrii Korobeinikov',
      'Raman Zatsarenko',
      'Sergei Chuprov',
      'Arnaldo Barea',
      'Leon Reznik'
    ],
    venue: 'IEEE/IFIP International Conference on Dependable Systems and Networks (DSN)',
    year: 2026,
    status: 'under-review',
    keywords: [
      'Federated Learning',
      'Dependability',
      'Adversarial Attacks',
      'Benchmarking',
      'Byzantine Robustness'
    ]
  }
]

export const presentations: Presentation[] = [
  {
    id: 'youtube-aiml-tutorials',
    title: 'AI/ML Tutorial Series',
    venue: 'YouTube (@ajbarea)',
    date: '2024-Present',
    type: 'tutorial',
    url: 'https://youtube.com/@ajbarea'
  }
]

export const publicationsByStatus = {
  published: publications.filter((p) => p.status === 'published'),
  'under-review': publications.filter((p) => p.status === 'under-review'),
  accepted: publications.filter((p) => p.status === 'accepted')
}
