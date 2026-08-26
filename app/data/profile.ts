import type { Profile, Education, HonorAward } from '~/types'

export const profile: Profile = {
  name: 'AJ Barea',
  title: 'Software Engineer',
  profileImage: '/images/profile/profile.webp',
  contact: {
    email: 'ajbareaa@gmail.com',
    github: 'ajbarea',
    youtube: '@ajbarea',
    orcid: '0009-0001-7938-2376'
  },
  socialLinks: [
    {
      platform: 'github',
      url: 'https://github.com/ajbarea',
      icon: 'github',
      label: 'GitHub'
    },
    {
      platform: 'linkedin',
      url: 'https://linkedin.com/in/aj-barea',
      icon: 'linkedin',
      label: 'LinkedIn'
    },
    {
      platform: 'youtube',
      url: 'https://youtube.com/@ajbarea',
      icon: 'youtube',
      label: 'YouTube'
    },
    {
      platform: 'orcid',
      url: 'https://orcid.org/0009-0001-7938-2376',
      icon: 'orcid',
      label: 'ORCID iD',
      rel: 'me noopener noreferrer'
    },
    {
      platform: 'email',
      url: 'mailto:ajbareaa@gmail.com',
      icon: 'email',
      label: 'Email'
    }
  ]
}

export const education: Education[] = [
  {
    degree: 'Doctor of Philosophy',
    field: 'Computing and Information Sciences',
    institution: 'Rochester Institute of Technology',
    location: 'Rochester, NY',
    graduationDate: 'Aug 2026 – Present'
  },
  {
    degree: 'Master of Science',
    field: 'Software Engineering',
    institution: 'Rochester Institute of Technology',
    location: 'Rochester, NY',
    graduationDate: 'December 2025',
    gpa: 4.0,
    maxGpa: 4.0,
    relevantCoursework: [
      'Software Construction',
      'Software Architecture',
      'Software Quality Assurance',
      'Model-Driven Development',
      'Collaborative Software Development',
      'Engineering Cloud Software Systems',
      'Self-Adaptive Systems with Reinforcement Learning'
    ],
    capstoneResearch: {
      title: 'Enhancing Federated Learning Execution Framework',
      advisor: 'Dr. Leon Reznik',
      focus: [
        'Testing infrastructure',
        'Full-stack developer interface',
        'CI/CD pipelines',
        'Cross-platform compatibility',
        'Collaborative algorithm prototyping'
      ]
    }
  },
  {
    degree: 'Bachelor of Science',
    field: 'Computer Engineering',
    institution: 'University of South Florida',
    location: 'Tampa, FL',
    graduationDate: 'May 2022',
    gpa: 3.06,
    maxGpa: 4.0,
    relevantCoursework: [
      'Data Structures',
      'Object-Oriented Software Design',
      'Analysis of Algorithms',
      'Software Engineering',
      'Operating Systems',
      'Computer System Design',
      'Probability and Statistics for Engineers'
    ],
    capstoneResearch: {
      title: 'Private Blockchain System for Document Certification',
      advisor: 'Jeremy Ramos',
      focus: [
        'Private blockchain with Proof-of-Work mining and SHA-256 hashing',
        'Document certification flow tied to user signatures',
        'Admin dashboard with real-time blockchain metrics',
        'Google OAuth 2.0 + JWT authentication for admin security',
        'Node.js / Express backend with Sequelize ORM'
      ]
    }
  }
]

export const honorsAwards: HonorAward[] = [
  {
    title: 'Certificate of Performance – Jeremy Ramos Phiquest',
    year: 2022,
    documentUrl: '/documents/AJ Barea - Certificate of Performace - Phiquest.pdf'
  },
  {
    title: 'NSLS | The National Society of Leadership and Success',
    year: 2019,
    externalUrl: 'https://www.nsls.org/'
  },
  {
    title: 'Florida Bright Futures Scholarship',
    year: 2014,
    externalUrl: 'https://floridabrightfutures.gov/'
  },
  {
    title: 'Take Stock in Children Scholarship',
    year: 2011,
    externalUrl: 'https://www.takestockinchildren.org/'
  }
]
