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
    title: 'Federated Learning Accuracy and Convergence in Consumer-Centric Medical Imaging',
    venue: 'IEEE Consumer Communications & Networking Conference (CCNC)',
    year: 2026,
    status: 'under-review',
    abstract:
      'We investigate how reduced signal-to-noise ratio in medical images affects the accuracy and convergence of machine learning models trained across distributed clients. Using nine Medical MNIST subsets degraded with controlled SNR levels, we demonstrate that moderate noise leads to accuracy degradation ranging from 1.7 to 25.7 percentage points and delays convergence by up to 17 communication rounds. Our findings highlight the importance of benchmarking FL algorithms on datasets reflecting communication-induced data variability.',
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
    title:
      'IntelliFL Framework: Optimizing Federated Learning with Metacognition for Application Design and Deployment',
    venue: 'IEEE Intelligent Systems',
    year: 2026,
    status: 'under-review',
    abstract:
      'We argue that metacognition should be the guiding principle for designing and deploying Federated Learning applications. We introduce IntelliFL, the first framework that facilitates designing metacognitive FL systems by providing mechanisms to investigate how changes in execution conditions impact performance and security. We prove theoretically and verify empirically that metacognitive techniques such as self-monitoring and anomaly exclusion result in faster learning convergence.',
    keywords: [
      'Federated Learning',
      'Metacognition',
      'Intelligent Systems',
      'Robust Aggregation',
      'AI Agent'
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
    title: 'IntelliFL Framework: Design and Benchmark Tool for Dependable Federated Learning',
    venue: 'IEEE/IFIP International Conference on Dependable Systems and Networks (DSN)',
    year: 2026,
    status: 'under-review',
    abstract:
      'We introduce IntelliFL, a software tool engineered for systematic design and evaluation of FL systems dependability. IntelliFL provides functionality for benchmarking FL performance under diverse conditions including static and temporally dynamic adversarial attacks, supporting configurable robust aggregation algorithms. The framework incorporates intelligent control mechanisms including automated parameter selection, improved anomaly detection, and context-aware adaptation via an interactive AI agent.',
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
