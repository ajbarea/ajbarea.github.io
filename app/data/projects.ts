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
    types: ['ai-ml', 'full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1779282973/kourai-khryseai_nrxqnu.webp',
    docsUrl: 'https://ajbarea.github.io/kourai-khryseai/',
    githubUrl: 'https://github.com/ajbarea/kourai-khryseai',
    youtubeUrl: 'https://youtu.be/m5_-WdJdzL4',
    featured: true
  },
  {
    id: 'velocity-fl',
    title: 'VelocityFL',
    technologies: ['Rust', 'Python', 'Typer', 'maturin', 'Zensical', 'uv'],
    types: ['ai-ml', 'federated-learning'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1779282974/velocity-fl_dukewt.webp',
    docsUrl: 'https://ajbarea.github.io/vFL/',
    githubUrl: 'https://github.com/ajbarea/vFL',
    featured: true
  },
  {
    id: 'phalanx-fl',
    title: 'Phalanx-FL',
    technologies: ['Python', 'Flower', 'Docker', 'Redis', 'Celery', 'uv'],
    types: ['ai-ml', 'federated-learning'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1779282973/phalanx-fl_hlq7gn.webp',
    docsUrl: 'https://ajbarea.github.io/phalanx-fl/',
    githubUrl: 'https://github.com/ajbarea/phalanx-fl',
    youtubeUrl: 'https://youtu.be/UtOHEHz2pWw',
    featured: true
  },
  {
    id: 'techne',
    title: 'Techne',
    technologies: ['Claude Code', 'Python', 'TOML', 'Bash'],
    types: ['ai-ml'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1779282974/techne_m0vadx.webp',
    githubUrl: 'https://github.com/ajbarea/techne',
    featured: true
  },
  {
    id: 'intellifl',
    title: 'InteFL',
    technologies: ['Python', 'PyTorch', 'FLOWER', 'Federated Learning', 'Docker'],
    types: ['ai-ml', 'federated-learning'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767633883/IntelliFL_r48xde.png',
    githubUrl: 'https://github.com/dmitrykoro/fl-execution-framework',
    youtubeUrl: 'https://youtu.be/2Q3Fv6Df3gU',
    featured: true
  },
  {
    id: 'security-eval',
    title: 'Security Evaluation System',
    technologies: ['Python', 'FastAPI', 'CLIPS', 'PyTorch', 'Next.js'],
    types: ['ai-ml', 'federated-learning', 'full-stack'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767632723/ses_mfbacm.png',
    githubUrl: 'https://github.com/ajbarea/ses',
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
    id: 'control-mobile-robots',
    title: 'Control of Mobile Robots',
    technologies: ['Python', 'Webots', 'Robotics', 'Localization', 'Path Planning'],
    types: ['robotics'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767634303/control-robots_mtf8fl.png',
    githubUrl: 'https://github.com/ajbarea/control-of-mobile-robots',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLmQVFU1FBDddYV_4IRW1zfXH6CAKuZjIM',
    featured: true
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    technologies: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'vue-i18n', 'Ollama'],
    types: ['ai-ml', 'full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1767634496/portfolio_smiobu.png',
    demoUrl: 'https://ajbarea.github.io/',
    githubUrl: 'https://github.com/ajbarea/ajbarea.github.io',
    featured: true
  },
  {
    id: 'orchestrate-triage',
    title: 'HackerRank Orchestrate Triage',
    technologies: ['Claude Opus 4.7', 'Python', 'Pydantic', 'Anthropic Message Batches API', 'uv'],
    types: ['ai-ml', 'hackathon'],
    thumbnailUrl: 'https://res.cloudinary.com/dumwa1w5x/image/upload/v1779391916/triage_cxgfbo.png',
    docsUrl: 'https://ajbarea.github.io/orchestrate-triage/',
    githubUrl: 'https://github.com/ajbarea/orchestrate-triage'
  },
  {
    id: 'bioradio-music',
    title: 'EMG-to-MIDI Music',
    technologies: ['Python', 'BioRadio (EMG/EEG)', 'Lab Streaming Layer', 'MIDI', 'Zensical'],
    types: ['ai-ml', 'hackathon'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1779376928/bioradio_raazmn.png',
    docsUrl: 'https://ajbarea.github.io/bioradio-music/',
    githubUrl: 'https://github.com/ajbarea/bioradio-music'
  },
  {
    id: 'blockchain-explorer',
    title: 'Blockchain Explorer',
    technologies: ['JavaScript', 'Node.js', 'Express', 'Sequelize', 'Google OAuth 2.0', 'JWT'],
    types: ['full-stack'],
    thumbnailUrl:
      'https://res.cloudinary.com/dumwa1w5x/image/upload/v1779376367/blockchain_p5glwx.png',
    githubUrl: 'https://github.com/ajbarea/blockchain-explorer',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLmQVFU1FBDdc3XyzoCp5NDFkoY5kzW3bT'
  }
]

export const featuredProjects = projects.filter((p) => p.featured)

export const projectsByType = {
  'ai-ml': projects.filter((p) => p.types.includes('ai-ml')),
  'federated-learning': projects.filter((p) => p.types.includes('federated-learning')),
  'full-stack': projects.filter((p) => p.types.includes('full-stack')),
  robotics: projects.filter((p) => p.types.includes('robotics')),
  hackathon: projects.filter((p) => p.types.includes('hackathon'))
}
