import type {
  TimelineEntry,
  ProfessionalExperience,
  ResearchExperience,
  TeachingExperience,
  TimelineEntryType
} from '~/types'

export const professionalExperience: ProfessionalExperience[] = [
  {
    id: 'lowes',
    title: 'Software Engineer (Contract)',
    company: "Lowe's Home Improvement",
    location: 'Remote, US',
    startDate: 'Feb 2023',
    endDate: 'Aug 2024',
    type: 'contract',
    department: 'Application Development Support - Distribution Management Systems',
    bullets: [
      'Cut daily error logs by 150,000 across RDCs by resolving bugs, optimizing log analysis, and enhancing system performance',
      'Developed a full-stack app to streamline database queries and generate SQL scripts, reducing support ticket resolution time',
      'Authored SOPs, slashing new engineer onboarding time by 80%',
      'Conducted root cause analysis for Tier 3 support, documenting solutions in BMC SmartIT and collaborating with supervisors',
      'Delivered secure, tested code updates to fix bugs and boost system efficiency, tracked via Jira and Confluence',
      'Thrived in Agile sprints, contributing to stand-ups and retrospectives'
    ],
    isCurrent: false
  },
  {
    id: 'phiquest',
    title: 'UX Developer',
    company: 'Phiquest',
    location: 'Tampa, FL',
    startDate: 'Mar 2022',
    endDate: 'May 2022',
    type: 'internship',
    bullets: [
      'Designed wireframes for web apps, collaborating with cross-functional teams to ensure feasible, user-friendly solutions',
      'Engineered a blockchain-based document authenticator Chrome extension using Node.js, enabling secure verification'
    ],
    isCurrent: false
  }
]

export const researchExperience: ResearchExperience[] = [
  {
    id: 'rit-fa-doctoral',
    title: 'Doctoral Researcher',
    institution: 'Rochester Institute of Technology',
    project: 'Federated Agents',
    startDate: 'Aug 2026',
    endDate: 'Present',
    bullets: [
      "Leading a research direction on coding agents that learn each organization's conventions and pool what generalizes, while each organization decides what may leave",
      'Designed a pre-registered test of whether learned house style transfers at the project or the organization boundary, written up as a Stage 1 registered report in preparation for MSR 2027',
      "Built sphragis, an open study harness that collects public code review from Gerrit and GitHub under each host's terms, pseudonymizes it at ingestion, seals the test window by hash, and trains and scores LoRA adapters on Slurm GPU clusters",
      'Built a source-attribution measurement of whether the shared/private adapter splits in the federated personalization literature reveal the source organization in the half they transmit'
    ],
    isCurrent: true
  },
  {
    id: 'ncsu-scads-2026',
    title: 'Summer Research Scholar',
    institution: 'NC State University · Laboratory for Analytic Sciences (LAS)',
    project: 'SCADS (Summer Conference on Applied Data Science)',
    startDate: 'May 2026',
    endDate: 'Aug 2026',
    bullets: [
      'Selected for a competitive summer research cohort applying data science to analytic sensemaking problems',
      "Prototyped an agentic sensemaking system on the Claude Agent SDK, tracing an entity's evidence across graph, relational, and text stores into a cited analytic note",
      'Built a governed MCP orchestration platform for agentic analytic workflows, cutting a measured policy-leak rate from 75% to 0% under a deterministic red-team evaluation battery',
      'Delivered a motion-first object tracking pipeline for camouflaged targets in video, benchmarked end to end against published state-of-the-art methods',
      'Instrumented agent and pipeline runs so multi-step reasoning could be inspected, replayed, and evaluated rather than treated as a black box'
    ],
    isCurrent: false
  },
  {
    id: 'rit-gra',
    title: 'Graduate Research Assistant',
    institution:
      'Laboratory of Data Quality and Intelligent Security (LDQIS), Rochester Institute of Technology',
    advisor: 'Dr. Leon Reznik',
    startDate: 'May 2025',
    endDate: 'Present',
    bullets: [
      "Designed a pytest suite reaching 80%+ coverage, run in GitHub Actions CI, for InteFL, the lab's distributed federated learning framework, converting a research prototype into a dependable, reproducible platform",
      'Built attack and defense tooling for InteFL: per-strategy schedules that start, stop, and stack label-flipping and Gaussian-noise poisoning by round, a multi-token sequence replacement attack, before/after snapshots of what each attack changed, and the FreqFed robust aggregation strategy',
      "Added Hugging Face dataset loaders for financial, legal, and biomedical text (including MEDAL) for transformer experiments, and let InteFL's experiment-planning AI agent run on Claude, any OpenAI-compatible vendor, or local Ollama and vLLM models",
      "Built the lab's new website (Astro, Tailwind, git-backed CMS) to replace its legacy Flask site"
    ],
    isCurrent: true
  },
  {
    id: 'independent-ml',
    title: 'Machine Learning Research Projects',
    institution: 'Self-directed',
    startDate: '2024',
    endDate: '2025',
    bullets: [
      'Autonomous Robot Navigation RL - Developed Q-learning and DQN framework in Webots simulator with state discretization, replay buffers, and PyTorch-based hyperparameter optimization (documented via YouTube tutorials)',
      'Host Security Assessment - Built a Windows host security assessment tool that scores patches, open ports, firewall, antivirus, and password policy through a CLIPS expert system, a PyTorch network trained to approximate it, or federated training',
      'Natural Language Processing - Implemented news summarization system using Hugging Face Transformers (BART) with personalized recommendations via collaborative filtering (scikit-surprise)'
    ],
    isCurrent: false
  }
]

export const teachingExperience: TeachingExperience[] = [
  {
    id: 'rit-ta',
    title: 'Teaching Assistant',
    course: 'Software Architecture',
    institution: 'Rochester Institute of Technology',
    startDate: 'Aug 2025',
    endDate: 'Dec 2025',
    bullets: [
      'Mentor students in software design patterns, architectural styles, quality attributes and tactics',
      'Lead recitation sections and office hours providing technical guidance on architecture decisions',
      "Taught a full class session during the instructor's absence",
      'Grade assignments with detailed feedback emphasizing rigorous software engineering practices'
    ]
  }
]

// Combined timeline entries for home page display
const unsortedEntries: TimelineEntry[] = [
  {
    id: 'rit-phd-2026',
    type: 'education' as TimelineEntryType,
    title: 'Doctor of Philosophy',
    subtitle: 'Computing and Information Sciences',
    organization: 'Rochester Institute of Technology',
    timeframe: 'Aug 2026 – Present',
    description:
      "Research on coding agents that learn each organization's conventions and pool what generalizes, while each organization decides what may leave. Advisor: Dr. Leon Reznik. Also an NSF AWARE-AI National Research Traineeship (NRT) trainee in the AI Software track.",
    skills: ['Federated Learning', 'Agentic AI', 'Code Review', 'LoRA'],
    icon: 'education',
    isCurrent: true,
    sortDate: '2026-08-15'
  },
  {
    id: 'ncsu-scads-2026',
    type: 'research' as TimelineEntryType,
    title: 'Summer Research Scholar',
    subtitle: 'SCADS · Summer Conference on Applied Data Science',
    organization: 'NC State · Laboratory for Analytic Sciences',
    timeframe: 'May 2026 – Aug 2026',
    description:
      'Selected for a competitive summer research cohort applying data science to analytic sensemaking problems. Built agentic sensemaking and governed MCP orchestration prototypes and a motion-first tracking pipeline for camouflaged targets in video.',
    skills: ['Claude Agent SDK', 'MCP', 'Agentic AI', 'Video Object Tracking'],
    icon: 'research',
    isCurrent: false,
    sortDate: '2026-05-01'
  },
  {
    id: 'rit-gra',
    type: 'research' as TimelineEntryType,
    title: 'Graduate Research Assistant',
    subtitle: 'Laboratory of Data Quality and Intelligent Security (LDQIS)',
    organization: 'Rochester Institute of Technology',
    timeframe: 'May 2025 – Present',
    description:
      "Built InteFL's pytest suite (80%+ coverage, run in GitHub Actions CI), its attack and defense tooling, and its Hugging Face text-dataset loaders. Built the lab's new website.",
    skills: ['Federated Learning', 'pytest', 'GitHub Actions', 'Hugging Face', 'Astro'],
    icon: 'research',
    isCurrent: true,
    sortDate: '2025-05-01'
  },
  {
    id: 'rit-ta',
    type: 'teaching' as TimelineEntryType,
    title: 'Teaching Assistant',
    subtitle: 'Software Architecture',
    organization: 'Rochester Institute of Technology',
    timeframe: 'Aug 2025 – Dec 2025',
    description:
      'Mentoring students in design patterns, architectural styles, and quality attributes. Led full class session during instructor absence.',
    skills: ['Software Architecture', 'Design Patterns', 'Mentoring', 'Code Review', 'Teaching'],
    icon: 'teaching',
    isCurrent: false,
    sortDate: '2025-08-01'
  },
  {
    id: 'rit-ms',
    type: 'education' as TimelineEntryType,
    title: 'Master of Science',
    subtitle: 'Software Engineering',
    organization: 'Rochester Institute of Technology',
    timeframe: 'Aug 2024 – Dec 2025',
    description:
      'GPA: 4.0/4.0. Capstone: Enhancing Federated Learning Execution Framework (Advisor: Dr. Leon Reznik).',
    skills: [
      'Machine Learning',
      'Distributed Systems',
      'Cloud Computing',
      'Software Architecture',
      'Python'
    ],
    icon: 'education',
    isCurrent: false,
    sortDate: '2023-08-01'
  },
  {
    id: 'lowes',
    type: 'professional' as TimelineEntryType,
    title: 'Software Engineer (Contract)',
    subtitle: 'Distribution Management Systems',
    organization: "Lowe's Home Improvement",
    timeframe: 'Feb 2023 – Aug 2024',
    description:
      'Cut daily error logs by 150,000 across RDCs. Built full-stack automation tooling. Reduced onboarding time by 80%.',
    skills: ['Java', 'SQL', 'Spring Boot', 'Full-Stack', 'Agile'],
    icon: 'work',
    isCurrent: false,
    sortDate: '2023-02-01'
  },
  {
    id: 'usf-bs',
    type: 'education' as TimelineEntryType,
    title: 'Bachelor of Science',
    subtitle: 'Computer Engineering',
    organization: 'University of South Florida',
    timeframe: 'May 2019 – May 2022',
    description: 'GPA: 3.06/4.0.',
    skills: ['C', 'C++', 'Embedded Systems', 'Digital Logic', 'Microcontrollers'],
    icon: 'education',
    isCurrent: false,
    sortDate: '2019-05-01'
  },
  {
    id: 'phiquest',
    type: 'professional' as TimelineEntryType,
    title: 'UX Developer (Internship)',
    subtitle: 'Development Team',
    organization: 'Phiquest',
    timeframe: 'Mar 2022 – May 2022',
    description:
      'Designed wireframes for web apps. Built blockchain-based document authenticator Chrome extension using Node.js.',
    skills: ['JavaScript', 'Node.js', 'UX Design', 'Blockchain', 'Figma'],
    icon: 'work',
    isCurrent: false,
    sortDate: '2022-03-01'
  }
]

export const timelineEntries: TimelineEntry[] = unsortedEntries.sort(
  (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
)
