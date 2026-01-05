import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 'news-aggregator',
    title: 'AI News Aggregator',
    description:
      'Intelligent news aggregation system using NLP for content classification and summarization.',
    longDescription:
      'A full-stack application that aggregates news from multiple sources, uses machine learning models for topic classification, and generates concise summaries using transformer-based models.',
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'FastAPI', 'React'],
    types: ['ai-ml', 'full-stack'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767632271/newsai_doo7mx.png',
    githubUrl: 'https://github.com/ajbarea/news-ai',
    featured: true
  },
  {
    id: 'security-eval',
    title: 'ML Security Evaluation System',
    description: 'Framework for evaluating security vulnerabilities in machine learning models.',
    longDescription:
      'A comprehensive system for testing ML models against adversarial attacks, data poisoning, and model extraction attempts. Includes automated vulnerability scanning and reporting.',
    technologies: ['Python', 'PyTorch', 'scikit-learn', 'Docker', 'AWS'],
    types: ['ai-ml'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767632723/ses_mfbacm.png',
    githubUrl: 'https://github.com/ajbarea/ses',
    featured: true
  },
  {
    id: 'aws-image-translator',
    title: 'AWS Image Translator',
    description:
      'Serverless application for extracting and translating text from images using AWS services.',
    longDescription:
      'A cloud-native application leveraging AWS Rekognition for OCR, AWS Translate for multi-language translation, and Lambda for serverless processing. Features a React frontend with S3 hosting.',
    technologies: ['AWS Lambda', 'AWS Rekognition', 'AWS Translate', 'React', 'Terraform'],
    types: ['cloud', 'ai-ml'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767632922/lenslate_zqnv73.png',
    githubUrl: 'https://github.com/ajbarea/aws-image-translate',
    featured: true
  },
  {
    id: 'robot-navigation-rl',
    title: 'Robot Navigation with RL',
    description:
      'Reinforcement learning agent for autonomous robot navigation in simulated environments.',
    longDescription:
      'Implementation of deep reinforcement learning algorithms (DQN, PPO) for training robots to navigate complex environments in Webots simulator. Includes curriculum learning and reward shaping.',
    technologies: ['Python', 'PyTorch', 'Webots', 'Reinforcement Learning', 'OpenAI Gym'],
    types: ['ai-ml', 'robotics'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767633039/robot_mesprt.png',
    githubUrl: 'https://github.com/ajbarea/goal-seeker-ai',
    featured: true
  },
  {
    id: 'intellifl',
    title: 'IntelliFL Framework',
    description:
      'Federated learning framework with intelligent client selection and privacy-preserving aggregation.',
    longDescription:
      'Research project developing a novel federated learning framework that optimizes client selection based on data quality and computational resources while maintaining differential privacy guarantees.',
    technologies: ['Python', 'PyTorch', 'FLOWER', 'Federated Learning', 'Docker'],
    types: ['ai-ml'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767633883/IntelliFL_r48xde.png',
    githubUrl: 'https://github.com/dmitrykoro/fl-execution-framework',
    featured: true
  },
  {
    id: 'tbd-banking',
    title: 'TBD Banking Application',
    description:
      'Banking app enabling account creation, credentials management, and fund transfers with transaction tracking.',
    longDescription:
      'Full-stack banking application with real-time notifications, transaction tracking, and secure fund transfers. Built with Spring Boot backend and Angular frontend.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'REST API'],
    types: ['full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767633998/tbd-bank_sticwd.png',
    githubUrl: 'https://github.com/ajbarea/tbd-banking-application',
    youtubeUrl: 'https://youtu.be/RiDxzmMX-qk',
    featured: false
  },
  {
    id: 'thoughtcloud-social',
    title: 'ThoughtCloud Social',
    description:
      'Social platform for sharing thoughts, building networks, and engaging with posts and notifications.',
    longDescription:
      'A social networking platform where users can share thoughts, follow other users, and receive real-time notifications. Features post creation, commenting, and user engagement tracking.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Real-time'],
    types: ['full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767634147/thoughtcloud_j9diac.png',
    githubUrl: 'https://github.com/ajbarea/thought-cloud-social',
    youtubeUrl: 'https://youtu.be/w8TgRcd1uWQ',
    featured: false
  },
  {
    id: 'control-mobile-robots',
    title: 'Control of Mobile Robots',
    description:
      'Mobile robot control systems using Python and Webots covering localization, navigation, and sensor integration.',
    longDescription:
      'Coursework labs covering mobile robot control systems including localization algorithms, path planning, navigation strategies, and sensor integration with comprehensive video explainers.',
    technologies: ['Python', 'Webots', 'Robotics', 'Localization', 'Path Planning'],
    types: ['robotics'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767634303/control-robots_mtf8fl.png',
    githubUrl: 'https://github.com/ajbarea/control-of-mobile-robots',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLmQVFU1FBDddYV_4IRW1zfXH6CAKuZjIM',
    featured: false
  },
  {
    id: 'blockchain-explorer',
    title: 'Blockchain Explorer',
    description:
      'Custom blockchain for authenticating digital signatures with tamper-proof verification.',
    longDescription:
      'A custom blockchain implementation for authenticating digital signatures with tamper-proof verification and real-time transaction searches. Demonstrates core blockchain concepts.',
    technologies: ['JavaScript', 'Node.js', 'Blockchain', 'Cryptography', 'Express'],
    types: ['full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767634281/blockchain_jxu0wm.png',
    githubUrl: 'https://github.com/ajbarea/blockchain-explorer',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLmQVFU1FBDdc3XyzoCp5NDFkoY5kzW3bT',
    featured: false
  },
  {
    id: 'expense-reimbursement',
    title: 'Expense Reimbursement System',
    description:
      'System for submitting and approving expense reimbursements with employee and manager workflows.',
    longDescription:
      'A complete expense management system with role-based access for employees and managers. Features expense submission, approval workflows, and reimbursement tracking.',
    technologies: ['Java', 'Servlets', 'PostgreSQL', 'JDBC', 'REST API'],
    types: ['full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767634487/reimbursement_l0oho4.png',
    githubUrl: 'https://github.com/ajbarea/expense-reimbursement-system',
    youtubeUrl: 'https://youtu.be/t2p_fUak_Mw',
    featured: false
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'This website! - a modern Nuxt 3 portfolio showcasing projects, resume, gallery, and blog.',
    longDescription:
      'A responsive single-page application built with Nuxt 3, Vue 3, and Tailwind CSS. Features dark mode, SSR/SSG support, photo gallery with PhotoSwipe, and dual resume views.',
    technologies: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'SSG'],
    types: ['full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767634496/portfolio_smiobu.png',
    demoUrl: 'https://ajbarea.github.io/',
    githubUrl: 'https://github.com/ajbarea/ajbarea.github.io',
    featured: false
  }
]

export const featuredProjects = projects.filter((p) => p.featured)

export const projectsByType = {
  'ai-ml': projects.filter((p) => p.types.includes('ai-ml')),
  'full-stack': projects.filter((p) => p.types.includes('full-stack')),
  robotics: projects.filter((p) => p.types.includes('robotics')),
  cloud: projects.filter((p) => p.types.includes('cloud'))
}
