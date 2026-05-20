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
    venue: 'IEEE Intelligent Systems (PrePrints)',
    year: 2026,
    status: 'accepted',
    doi: '10.1109/MIS.2026.3658072',
    url: 'https://ieeexplore.ieee.org/document/11366920/',
    abstract:
      'We argue that metacognition should be the guiding principle for designing and deployment of Federated Learning (FL) applications. The metacognitive features in FL, such as monitoring and control, allow for the dynamic adaptation to the environment, client updates, enhanced user interaction, and optimized resource-aware learning. We introduce IntelliFL, the first framework that facilitates designing metacognitive FL systems by providing mechanisms and tools to investigate how possible changes in execution and learning conditions impact FL performance and security, and then to choose or optimize the learning structure and process based on their evaluation. We demonstrate the framework application in practice on the cases showing how the choice of FL hyperparameters such as model aggregation algorithms can be dynamically adapted or fine-tuned in response to changing execution environment, including data quality variations, network conditions, or adversarial attacks.',
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
    title:
      'InteFL: Framework for AI-Assisted Design of Trustworthy and Efficient Federated Learning Applications',
    venue: 'IJCNN 2026 (IEEE WCCI, Maastricht)',
    year: 2026,
    status: 'accepted',
    url: 'https://attend.ieee.org/wcci-2026/',
    abstract:
      "Although Federated Learning (FL) enhances clients' security and privacy by retaining data locally, the decentralized nature of this paradigm exposes it to diverse malicious actions as well as technological and reliability issues that can degrade data quality, hinder convergence, and reduce global model accuracy. Accounting for these destabilizing factors is essential in FL design for its integration in robust and reliable practical applications. To address this need, we introduce InteFL, a software tool engineered for the systematic design and evaluation of efficient and secure FL. InteFL provides functionality for benchmarking of FL performance under diverse conditions, including static and temporally dynamic adversarial attacks, and supports configuring and finetuning of robust aggregation algorithms and their parameters. Built as an extension to existing FL tools, InteFL possesses a higher practicality by incorporating intelligent agents that enhance tool usability. We present several use cases demonstrating how our tool supports the search and investigation of more resilient aggregation techniques for diverse attack models, and how parameter fine-tuning accelerates convergence and improves the accuracy of resulting ML models.",
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
