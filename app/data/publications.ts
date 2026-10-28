import type { Publication, Presentation } from '~/types'

export const publications: Publication[] = [
  {
    id: 'ieee-is-2026',
    authors: [
      'Dmitrii Korobeinikov',
      'Raman Zatsarenko',
      'Sergei Chuprov',
      'AJ Barea',
      'Leon Reznik'
    ],
    venue: 'IEEE Intelligent Systems',
    year: 2026,
    status: 'published',
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
      'AJ Barea',
      'Leon Reznik',
      'Raman Zatsarenko',
      'Sergei Chuprov',
      'Angel Peredo'
    ],
    venue: 'IJCNN 2026 (IEEE WCCI, Maastricht)',
    year: 2026,
    status: 'published',
    doi: '10.1109/IJCNN69854.2026.11730045',
    url: 'https://ieeexplore.ieee.org/document/11730045/',
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
    id: 'kourai-ne-agents-day-2026',
    authors: ['AJ Barea'],
    venue: 'North-East AI Agents Day Workshop, Jane Street, New York, NY',
    year: 2026,
    status: 'accepted',
    url: 'https://openreview.net/forum?id=jdD8sORLLY',
    keywords: [
      'AI Agents',
      'Multi-Agent Systems',
      'Software Engineering',
      'Human-in-the-Loop',
      'Observability'
    ]
  },
  {
    id: 'scads-tr-makesense-2026',
    authors: ['Jewel G. Padilla', 'AJ Barea', 'Benjamin K. Johnson', 'Jacob H. Tarosky'],
    venue:
      'SCADS 2026 Technical Report (pp. 7-34), Laboratory for Analytic Sciences, NC State University',
    year: 2026,
    status: 'published',
    url: 'https://ncsu-las.org/2026/10/las-releases-scads-2026-technical-report/',
    keywords: ['Agentic AI', 'Model Context Protocol', 'Sensemaking', 'Governance', 'Provenance']
  },
  {
    id: 'scads-tr-video-motion-2026',
    authors: ['Benjamin K. Johnson', 'AJ Barea'],
    venue:
      'SCADS 2026 Technical Report (pp. 253-284), Laboratory for Analytic Sciences, NC State University',
    year: 2026,
    status: 'published',
    url: 'https://ncsu-las.org/2026/10/las-releases-scads-2026-technical-report/',
    keywords: [
      'Computer Vision',
      'Camouflaged Object Detection',
      'Optical Flow',
      'Segment Anything'
    ]
  },
  {
    id: 'iaai-27-makesense',
    authors: ['AJ Barea', 'Benjamin K. Johnson', 'Jacob H. Tarosky', 'Jewel G. Padilla'],
    venue: 'Submitted to Innovative Applications of Artificial Intelligence (IAAI-27)',
    year: 2026,
    status: 'under-review'
  },
  {
    id: 'msr-2027-house-style',
    authors: ['AJ Barea'],
    venue:
      'Stage 1 registered report, MSR 2027 Registered Reports track with Empirical Software Engineering',
    status: 'in-preparation'
  },
  {
    id: 'zenodo-techne-2026',
    authors: ['AJ Barea'],
    venue: 'Zenodo (software)',
    year: 2026,
    status: 'published',
    doi: '10.5281/zenodo.23330765'
  },
  {
    id: 'zenodo-keryx-2026',
    authors: ['AJ Barea'],
    venue: 'Zenodo (software)',
    year: 2026,
    status: 'published',
    doi: '10.5281/zenodo.23327640'
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
  },
  {
    id: 'tracefl-sqa-2025',
    title: 'TraceFL: Debugging Federated Learning Systems',
    venue: 'Software Quality Assurance, Rochester Institute of Technology',
    date: 'Fall 2025',
    type: 'talk'
  }
]

export const publicationsByStatus = {
  published: publications.filter((p) => p.status === 'published'),
  'under-review': publications.filter((p) => p.status === 'under-review'),
  accepted: publications.filter((p) => p.status === 'accepted'),
  'in-preparation': publications.filter((p) => p.status === 'in-preparation')
}
