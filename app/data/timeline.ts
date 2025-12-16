import type {
  TimelineEntry,
  ProfessionalExperience,
  ResearchExperience,
  TeachingExperience,
} from '~/types'

export const professionalExperience: ProfessionalExperience[] = [
  {
    id: 'lowes',
    title: 'Software Engineer',
    company: "Lowe's Companies, Inc.",
    location: 'Charlotte, NC',
    startDate: 'Feb 2023',
    endDate: 'Aug 2024',
    type: 'full-time',
    department: 'Technology',
    bullets: [
      'Developed and maintained full-stack applications using React, Java Spring Boot, and AWS services',
      'Implemented CI/CD pipelines using GitHub Actions and Terraform for infrastructure as code',
      'Collaborated with cross-functional teams to deliver features for e-commerce platform',
      'Optimized application performance and reduced load times through caching strategies',
    ],
    isCurrent: false,
  },
  {
    id: 'phiquest',
    title: 'Software Developer Intern',
    company: 'Phiquest',
    location: 'Tampa, FL',
    startDate: 'Mar 2022',
    endDate: 'May 2022',
    type: 'internship',
    bullets: [
      'Developed web applications using modern JavaScript frameworks',
      'Participated in agile development processes and code reviews',
      'Contributed to database design and API development',
    ],
    isCurrent: false,
  },
]

export const researchExperience: ResearchExperience[] = [
  {
    id: 'rit-gra',
    title: 'Graduate Research Assistant',
    institution: 'Rochester Institute of Technology',
    project: 'Federated Learning Framework',
    startDate: 'May 2025',
    endDate: 'Present',
    bullets: [
      'Developing IntelliFL framework for federated learning with privacy-preserving techniques',
      'Researching agentic AI approaches for distributed machine learning systems',
      'Publishing research papers on federated learning and ML testing',
    ],
    isCurrent: true,
  },
  {
    id: 'independent-ml',
    title: 'Independent ML Researcher',
    institution: 'Self-directed',
    startDate: 'Jan 2024',
    endDate: 'Present',
    bullets: [
      'Developed AI/ML projects including news aggregator and security evaluation systems',
      'Created educational content on YouTube covering AI/ML topics',
      'Contributed to open source ML projects',
    ],
    isCurrent: true,
  },
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
      'Assisted students with software architecture concepts and design patterns',
      'Graded assignments and provided feedback on architectural decisions',
      'Held office hours to support student learning',
    ],
  },
]

import type { TimelineEntryType } from '~/types'

// Combined timeline entries for home page display
const unsortedEntries: TimelineEntry[] = [
  {
    id: 'rit-gra',
    type: 'research' as TimelineEntryType,
    title: 'Graduate Research Assistant',
    subtitle: 'Federated Learning Framework',
    organization: 'Rochester Institute of Technology',
    timeframe: 'May 2025 – Present',
    description:
      'Developing IntelliFL framework for federated learning with privacy-preserving techniques.',
    skills: ['PyTorch', 'FLOWER', 'Python', 'Distributed Systems'],
    icon: 'research',
    isCurrent: true,
    sortDate: '2025-05-01',
  },
  {
    id: 'rit-ta',
    type: 'teaching' as TimelineEntryType,
    title: 'Teaching Assistant',
    subtitle: 'Software Architecture',
    organization: 'Rochester Institute of Technology',
    timeframe: 'Aug 2025 – Dec 2025',
    description: 'Assisting students with software architecture concepts and design patterns.',
    skills: ['Software Architecture', 'Design Patterns', 'Teaching'],
    icon: 'teaching',
    isCurrent: true,
    sortDate: '2025-08-01',
  },
  {
    id: 'rit-ms',
    type: 'education' as TimelineEntryType,
    title: 'Master of Science',
    subtitle: 'Software Engineering',
    organization: 'Rochester Institute of Technology',
    timeframe: 'Aug 2023 – Dec 2025',
    description: 'GPA: 4.0/4.0. Capstone: Federated Learning Framework.',
    skills: ['Machine Learning', 'Distributed Systems', 'Cloud Computing'],
    icon: 'education',
    isCurrent: true,
    sortDate: '2023-08-01',
  },
  {
    id: 'lowes',
    type: 'professional' as TimelineEntryType,
    title: 'Software Engineer',
    subtitle: 'Technology',
    organization: "Lowe's Companies, Inc.",
    timeframe: 'Feb 2023 – Aug 2024',
    description: 'Full-stack development with React, Java Spring Boot, and AWS services.',
    skills: ['React', 'Java', 'Spring Boot', 'AWS', 'Terraform'],
    icon: 'work',
    isCurrent: false,
    sortDate: '2023-02-01',
  },
  {
    id: 'usf-bs',
    type: 'education' as TimelineEntryType,
    title: 'Bachelor of Science',
    subtitle: 'Computer Engineering',
    organization: 'University of South Florida',
    timeframe: 'Aug 2018 – May 2022',
    description: 'GPA: 3.06/4.0.',
    skills: ['C++', 'Python', 'Embedded Systems'],
    icon: 'education',
    isCurrent: false,
    sortDate: '2018-08-01',
  },
  {
    id: 'phiquest',
    type: 'professional' as TimelineEntryType,
    title: 'Software Developer Intern',
    subtitle: 'Development Team',
    organization: 'Phiquest',
    timeframe: 'Mar 2022 – May 2022',
    description: 'Web application development using modern JavaScript frameworks.',
    skills: ['JavaScript', 'Web Development', 'Agile'],
    icon: 'work',
    isCurrent: false,
    sortDate: '2022-03-01',
  },
]

export const timelineEntries: TimelineEntry[] = unsortedEntries.sort(
  (a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime()
)
