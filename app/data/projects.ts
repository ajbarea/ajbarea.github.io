import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 'kourai-khryseai',
    title: 'Kourai Khryseai',
    technologies: [
      'Python',
      'A2A Protocol',
      'MCP',
      'OpenTelemetry',
      'Jaeger',
      'Prometheus',
      'SQLite',
      'pygame',
      "Ren'Py",
      'uv'
    ],
    types: ['ai-ml'],
    thumbnailUrl: '/images/projects/kourai-khryseai.webp',
    docsUrl: 'https://ajbarea.github.io/kourai-khryseai/',
    githubUrl: 'https://github.com/ajbarea/kourai-khryseai',
    featured: true
  },
  {
    id: 'velocity-fl',
    title: 'VelocityFL',
    technologies: ['Rust', 'Python', 'Typer', 'maturin', 'Zensical', 'uv'],
    types: ['ai-ml'],
    thumbnailUrl: '/images/projects/velocity-fl.webp',
    docsUrl: 'https://ajbarea.github.io/vFL/',
    githubUrl: 'https://github.com/ajbarea/vFL',
    featured: true
  },
  {
    id: 'phalanx-fl',
    title: 'Phalanx-FL',
    technologies: ['Python', 'Flower', 'Docker', 'Redis', 'Celery', 'uv'],
    types: ['ai-ml'],
    thumbnailUrl: '/images/projects/phalanx-fl.webp',
    docsUrl: 'https://ajbarea.github.io/phalanx-fl/',
    githubUrl: 'https://github.com/ajbarea/phalanx-fl',
    featured: true
  },
  {
    id: 'techne',
    title: 'Techne',
    technologies: ['Claude Code', 'Python', 'TOML', 'Bash'],
    types: ['ai-ml'],
    thumbnailUrl: '/images/projects/techne.webp',
    githubUrl: 'https://github.com/ajbarea/techne',
    featured: true
  },
  {
    id: 'news-aggregator',
    title: 'AI News Aggregator',
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'FastAPI', 'React'],
    types: ['ai-ml', 'full-stack'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767632271/newsai_doo7mx.png',
    githubUrl: 'https://github.com/ajbarea/news-ai',
    featured: true
  },
  {
    id: 'security-eval',
    title: 'ML Security Evaluation System',
    technologies: ['Python', 'PyTorch', 'scikit-learn', 'Docker', 'AWS'],
    types: ['ai-ml'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767632723/ses_mfbacm.png',
    githubUrl: 'https://github.com/ajbarea/ses',
    featured: true
  },
  {
    id: 'aws-image-translator',
    title: 'AWS Image Translator',
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
    technologies: ['Python', 'PyTorch', 'Webots', 'Reinforcement Learning', 'OpenAI Gym'],
    types: ['ai-ml', 'robotics'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767633039/robot_mesprt.png',
    githubUrl: 'https://github.com/ajbarea/goal-seeker-ai',
    featured: true
  },
  {
    id: 'intellifl',
    title: 'InteFL',
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
