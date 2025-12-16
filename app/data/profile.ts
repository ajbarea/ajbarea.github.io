import type { Profile, Education } from '~/types'

export const profile: Profile = {
  name: 'AJ Barea',
  title: 'Software Engineer',
  roles: [
    'Software Engineer',
    'Full Stack Developer',
    'Cloud Architect',
    'ML Researcher',
    'Graduate Teaching Assistant',
  ],
  summary:
    'Software Engineer specializing in full-stack development, AI/ML, and cloud solutions. Currently completing MS in Software Engineering at RIT with research focus on federated learning and agentic AI.',
  profileImage: '/images/profile.png',
  contact: {
    email: 'ajbareaa@gmail.com',
    phone: '(727) 262-7305',
    github: 'ajbarea',
    youtube: '@ajbarea',
  },
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/ajbarea',
      icon: 'github',
      label: 'GitHub',
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/aj-barea',
      icon: 'linkedin',
      label: 'LinkedIn',
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@ajbarea',
      icon: 'youtube',
      label: 'YouTube',
    },
    {
      platform: 'email',
      url: 'mailto:ajbareaa@gmail.com',
      icon: 'email',
      label: 'Email',
    },
  ],
  researchInterests: [
    'Federated learning',
    'Agentic AI',
    'Testing for distributed ML',
    'Developer experience',
    'AI-assisted development',
  ],
}

export const education: Education[] = [
  {
    degree: 'Master of Science',
    field: 'Software Engineering',
    institution: 'Rochester Institute of Technology',
    location: 'Rochester, NY',
    graduationDate: 'December 2025',
    gpa: 4.0,
    maxGpa: 4.0,
    relevantCoursework: [
      'Software Architecture',
      'Machine Learning',
      'Distributed Systems',
      'Software Testing',
      'Cloud Computing',
    ],
    capstoneResearch: {
      title: 'Federated Learning Framework',
      advisor: 'TBD',
      focus: ['Federated learning', 'Privacy-preserving ML', 'Distributed systems'],
    },
  },
  {
    degree: 'Bachelor of Science',
    field: 'Computer Engineering',
    institution: 'University of South Florida',
    location: 'Tampa, FL',
    graduationDate: 'May 2022',
    gpa: 3.06,
    maxGpa: 4.0,
  },
]
