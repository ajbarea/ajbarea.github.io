import type { Profile, Education, HonorAward } from '~/types'

export const profile: Profile = {
  name: 'AJ Barea',
  title: 'Software Engineer',
  roles: [
    'Software Engineer',
    'AI/ML Researcher',
    'Full-Stack Developer',
    'Distributed Systems Engineer',
    'Cloud Architect',
    'Violinist',
    'Hardcore Gamer',
    'Otaku',
    'Favorite Son',
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

export const honorsAwards: HonorAward[] = [
  {
    title: 'Certificate of Performance – Jeremy Ramos Phiquest',
    year: 2022,
    documentUrl: '/documents/AJ Barea - Certificate of Performace - Phiquest.pdf',
  },
  {
    title: 'NSLS | The National Society of Leadership and Success',
    year: 2019,
  },
  {
    title: 'Florida Bright Futures and Doorways/Take Stock in Children Scholarships',
    year: 2018,
  },
]
