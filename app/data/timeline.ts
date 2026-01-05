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
    title: 'Software Engineer',
    company: "Lowe's Home Improvement",
    location: 'Remote, US',
    startDate: 'Feb 2023',
    endDate: 'Aug 2024',
    type: 'full-time',
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
    id: 'rit-gra',
    title: 'Graduate Research Assistant',
    institution: 'Rochester Institute of Technology',
    project: "Federated Learning Framework Enhancement - Dr. Leon Reznik's Research Group",
    startDate: 'May 2025',
    endDate: 'Present',
    bullets: [
      'Designed comprehensive pytest testing suite achieving 80%+ code coverage for distributed FL systems (IntelliFL framework)',
      'Built React + FastAPI web interface improving researcher onboarding time and experimental reproducibility',
      'Collaborated with PhD students to rapidly prototype novel aggregation strategies including Byzantine-robust methods (Krum, Bulyan, RFA, Trimmed Mean) and trust-based federated learning approaches',
      'Implemented dynamic dataset poisoning system enabling adversarial robustness evaluation during federated training',
      'Integrated transformer-based models for federated learning on text datasets spanning medical, legal, and financial domains',
      'Extended framework compatibility across Python 3.9-3.11 and multiple operating systems (Windows, macOS, Linux)',
      'Established CI pipeline and comprehensive error handling, transforming research prototype into production-ready system'
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
      'Federated Learning Security - Built evaluation system combining CLIPS rule-based expert systems, PyTorch neural networks, and federated learning techniques to assess Byzantine fault tolerance in distributed ML systems',
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
      'Taught full class session during instructor absence, receiving positive student feedback',
      'Grade assignments with detailed feedback emphasizing rigorous software engineering practices'
    ]
  }
]

// Combined timeline entries for home page display
const unsortedEntries: TimelineEntry[] = [
  {
    id: 'rit-gra',
    type: 'research' as TimelineEntryType,
    title: 'Graduate Research Assistant',
    subtitle: "Dr. Leon Reznik's Research Group",
    organization: 'Rochester Institute of Technology',
    timeframe: 'May 2025 – Present',
    description:
      'Enhancing IntelliFL federated learning framework with 80%+ test coverage, React/FastAPI interface, and Byzantine-robust aggregation methods.',
    skills: ['Federated Learning', 'PyTorch', 'React', 'FastAPI', 'Python'],
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
    timeframe: 'Aug 2018 – May 2022',
    description: 'GPA: 3.06/4.0.',
    skills: ['C', 'C++', 'Embedded Systems', 'Digital Logic', 'Microcontrollers'],
    icon: 'education',
    isCurrent: false,
    sortDate: '2018-08-01'
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
