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
    'Favorite Son'
  ],
  summary:
    'Detail-oriented Software Engineer experienced in developing scalable tools and cloud solutions using Python, React, Java, and AWS. Skilled in full-stack development and AI/ML engineering involving PyTorch, transformers, and reinforcement learning. Passionate about building reliable, intelligent systems that bridge software engineering and applied machine learning.',
  profileImage: 'https://res.cloudinary.com/dumwa1w5x/image/upload/q_auto,f_auto/profile_ubnllm',
  contact: {
    email: 'ajbareaa@gmail.com',
    phone: '(727) 262-7305',
    github: 'ajbarea',
    youtube: '@ajbarea'
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
      platform: 'email',
      url: 'mailto:ajbareaa@gmail.com',
      icon: 'email',
      label: 'Email'
    }
  ],
  researchInterests: [
    'Federated learning systems',
    'Agentic AI with tool use',
    'Testing methodologies for distributed ML',
    'Developer experience in ML research infrastructure',
    'AI-assisted software development'
  ]
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
    maxGpa: 4.0
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
    year: 2019
  },
  {
    title: 'Florida Bright Futures and Doorways/Take Stock in Children Scholarships',
    year: 2018
  }
]
