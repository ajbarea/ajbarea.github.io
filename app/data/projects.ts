import type { Project } from '~/types'

export const projects: Project[] = [
  {
    id: 'ariadne',
    title: 'Ariadne',
    technologies: [
      'Python',
      'Claude Agent SDK',
      'MCP',
      'Neo4j',
      'Postgres',
      'OpenTelemetry',
      'Jaeger',
      'uv'
    ],
    types: ['ai-ml'],
    thumbnailUrl: '/images/projects/ariadne.webp',
    docsUrl: 'https://ajbarea.github.io/ariadne/',
    githubUrl: 'https://github.com/ajbarea/ariadne',
    featured: true
  },
  {
    id: 'kourai-khryseai',
    title: 'Kourai Khryseai',
    technologies: [
      'Python',
      'Claude',
      'A2A Protocol',
      'MCP',
      'RealtimeTTS',
      'OpenTelemetry',
      'Jaeger',
      'Prometheus',
      'SQLite',
      'pygame-ce',
      "Ren'Py",
      'uv'
    ],
    types: ['ai-ml', 'full-stack'],
    thumbnailUrl: '/images/projects/kourai-khryseai.webp',
    docsUrl: 'https://ajbarea.github.io/kourai-khryseai/',
    githubUrl: 'https://github.com/ajbarea/kourai-khryseai',
    youtubeUrl: 'https://youtu.be/m5_-WdJdzL4',
    featured: true
  },
  {
    id: 'velocity-fl',
    title: 'Velocity-FL',
    technologies: [
      'Rust',
      'Python',
      'PyTorch',
      'HuggingFace',
      'FastMCP',
      'Prefab UI',
      'Typer',
      'maturin',
      'Zensical',
      'uv'
    ],
    types: ['ai-ml', 'federated-learning'],
    thumbnailUrl: '/images/projects/velocity-fl.webp',
    docsUrl: 'https://ajbarea.github.io/velocity-fl/',
    githubUrl: 'https://github.com/ajbarea/velocity-fl',
    featured: true
  },
  {
    id: 'security-eval',
    title: 'Security Evaluation System',
    technologies: ['Python', 'FastAPI', 'CLIPS', 'PyTorch', 'Next.js'],
    types: ['ai-ml', 'federated-learning', 'full-stack'],
    thumbnailUrl: '/images/projects/ses.webp',
    githubUrl: 'https://github.com/ajbarea/ses',
    featured: true
  },
  {
    id: 'phalanx-fl',
    title: 'Phalanx-FL',
    technologies: ['Python', 'Flower', 'Docker', 'Redis', 'Celery', 'uv'],
    types: ['ai-ml', 'federated-learning'],
    thumbnailUrl: '/images/projects/phalanx-fl.webp',
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
    thumbnailUrl: '/images/projects/techne.webp',
    githubUrl: 'https://github.com/ajbarea/techne',
    featured: true
  },
  {
    id: 'robot-navigation-rl',
    title: 'Robot Navigation with RL',
    technologies: ['Python', 'PyTorch', 'Webots', 'Reinforcement Learning', 'OpenAI Gym'],
    types: ['ai-ml', 'robotics'],
    thumbnailUrl: '/images/projects/robot.webp',
    githubUrl: 'https://github.com/ajbarea/goal-seeker-ai',
    featured: true
  },
  {
    id: 'intellifl',
    title: 'InteFL',
    technologies: ['Python', 'PyTorch', 'FLOWER', 'Federated Learning', 'Docker'],
    types: ['ai-ml', 'federated-learning'],
    thumbnailUrl: '/images/projects/intellifl.webp',
    githubUrl: 'https://github.com/dmitrykoro/fl-execution-framework',
    youtubeUrl: 'https://youtu.be/2Q3Fv6Df3gU',
    featured: true
  },
  {
    id: 'ldqis',
    title: 'LDQIS Lab Website',
    technologies: ['Astro 5', 'Tailwind 4', 'TypeScript', 'GitHub Pages'],
    types: ['full-stack'],
    thumbnailUrl: '/images/projects/ldqis.webp',
    demoUrl: 'https://ajbarea.github.io/ldqis/',
    githubUrl: 'https://github.com/ajbarea/ldqis',
    featured: true
  },
  {
    id: 'control-mobile-robots',
    title: 'Control of Mobile Robots',
    technologies: ['Python', 'Webots', 'Robotics', 'Localization', 'Path Planning'],
    types: ['robotics'],
    thumbnailUrl: '/images/projects/control-robots.webp',
    githubUrl: 'https://github.com/ajbarea/control-of-mobile-robots',
    youtubeUrl: 'https://www.youtube.com/playlist?list=PLmQVFU1FBDddYV_4IRW1zfXH6CAKuZjIM',
    featured: true
  },
  {
    id: 'orchestrate-triage',
    title: 'Orchestrate Triage',
    technologies: ['Claude Opus 4.7', 'Python', 'Pydantic', 'Anthropic Message Batches API', 'uv'],
    types: ['ai-ml', 'hackathon'],
    thumbnailUrl: '/images/projects/triage.webp',
    docsUrl: 'https://ajbarea.github.io/orchestrate-triage/',
    githubUrl: 'https://github.com/ajbarea/orchestrate-triage'
  },
  {
    id: 'bioradio-music',
    title: 'EMG-to-MIDI Music',
    technologies: ['Python', 'BioRadio (EMG/EEG)', 'Lab Streaming Layer', 'MIDI', 'Zensical'],
    types: ['ai-ml', 'hackathon'],
    thumbnailUrl: '/images/projects/bioradio.webp',
    docsUrl: 'https://ajbarea.github.io/bioradio-music/',
    githubUrl: 'https://github.com/ajbarea/bioradio-music'
  },
  {
    id: 'blockchain-explorer',
    title: 'Blockchain Explorer',
    technologies: ['JavaScript', 'Node.js', 'Express', 'Sequelize', 'Google OAuth 2.0', 'JWT'],
    types: ['full-stack'],
    thumbnailUrl: '/images/projects/blockchain.webp',
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
