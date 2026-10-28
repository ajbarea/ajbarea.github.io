import type { Skill, SkillCategory } from '~/types'

export const skills: Skill[] = [
  // Languages
  { name: 'Python', category: 'languages', icon: 'python', docUrl: 'https://python.org' },
  { name: 'Java', category: 'languages', icon: 'java', docUrl: 'https://docs.oracle.com/en/java/' },
  {
    name: 'TypeScript',
    category: 'languages',
    icon: 'typescript',
    docUrl: 'https://typescriptlang.org'
  },
  {
    name: 'JavaScript',
    category: 'languages',
    icon: 'javascript',
    docUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  { name: 'C++', category: 'languages', icon: 'cplusplus', docUrl: 'https://cplusplus.com' },
  { name: 'C', category: 'languages', icon: 'c', docUrl: 'https://en.cppreference.com/w/c' },
  { name: 'Rust', category: 'languages', icon: 'rust', docUrl: 'https://doc.rust-lang.org/' },
  {
    name: 'SQL',
    category: 'languages',
    icon: 'postgresql',
    docUrl: 'https://www.postgresql.org/docs/'
  },
  { name: 'React', category: 'languages', icon: 'react', docUrl: 'https://react.dev' },
  { name: 'Vue.js', category: 'languages', icon: 'vuejs', docUrl: 'https://vuejs.org' },
  {
    name: 'Spring Boot',
    category: 'languages',
    icon: 'spring',
    docUrl: 'https://spring.io/projects/spring-boot'
  },
  {
    name: 'FastAPI',
    category: 'languages',
    icon: 'fastapi',
    docUrl: 'https://fastapi.tiangolo.com/'
  },
  {
    name: 'Node.js',
    category: 'languages',
    icon: 'nodejs',
    docUrl: 'https://nodejs.org/docs/latest/api/'
  },

  // Cloud/DevOps
  {
    name: 'AWS EC2',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/ec2/'
  },
  {
    name: 'AWS S3',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/s3/'
  },
  {
    name: 'AWS Lambda',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/lambda/'
  },
  {
    name: 'AWS DynamoDB',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/dynamodb/'
  },
  {
    name: 'AWS API Gateway',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/api-gateway/'
  },
  {
    name: 'AWS CloudFront',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/cloudfront/'
  },
  {
    name: 'AWS Cognito',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/cognito/'
  },
  {
    name: 'AWS Rekognition',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/rekognition/'
  },
  {
    name: 'AWS Comprehend',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/comprehend/'
  },
  {
    name: 'AWS Translate',
    category: 'cloud-devops',
    icon: 'amazonwebservices',
    docUrl: 'https://aws.amazon.com/translate/'
  },
  { name: 'Docker', category: 'cloud-devops', icon: 'docker', docUrl: 'https://docs.docker.com' },
  {
    name: 'Terraform',
    category: 'cloud-devops',
    icon: 'terraform',
    docUrl: 'https://terraform.io'
  },
  {
    name: 'GitHub Actions',
    category: 'cloud-devops',
    icon: 'github',
    docUrl: 'https://docs.github.com/en/actions'
  },
  { name: 'Slurm', category: 'cloud-devops', docUrl: 'https://slurm.schedmd.com/' },

  // AI/ML
  { name: 'PyTorch', category: 'ai-ml', icon: 'pytorch', docUrl: 'https://pytorch.org' },
  {
    name: 'Hugging Face',
    category: 'ai-ml',
    icon: 'huggingface',
    docUrl: 'https://huggingface.co/docs'
  },
  {
    name: 'scikit-learn',
    category: 'ai-ml',
    icon: 'scikitlearn',
    docUrl: 'https://scikit-learn.org'
  },
  { name: 'PEFT (LoRA)', category: 'ai-ml', docUrl: 'https://huggingface.co/docs/peft' },
  { name: 'Flower', category: 'ai-ml', icon: 'python', docUrl: 'https://flower.ai' },
  { name: 'Federated Learning', category: 'ai-ml', docUrl: 'https://flower.ai/docs/' },
  { name: 'Webots', category: 'ai-ml', icon: 'robot', docUrl: 'https://cyberbotics.com' },
  { name: 'Reinforcement Learning', category: 'ai-ml', docUrl: 'https://spinningup.openai.com' },
  {
    name: 'Claude Agent SDK',
    category: 'ai-ml',
    icon: 'claude',
    docUrl: 'https://code.claude.com/docs/en/agent-sdk/overview'
  },
  {
    name: 'Model Context Protocol (MCP)',
    category: 'ai-ml',
    docUrl: 'https://modelcontextprotocol.io/'
  },
  { name: 'A2A Protocol', category: 'ai-ml', docUrl: 'https://a2a-protocol.org/' },

  // Tools
  { name: 'Git', category: 'tools', icon: 'git', docUrl: 'https://git-scm.com' },
  { name: 'Perforce', category: 'tools', icon: 'perforce', docUrl: 'https://www.perforce.com' },
  {
    name: 'Jira',
    category: 'tools',
    icon: 'jira',
    docUrl: 'https://www.atlassian.com/software/jira'
  },
  {
    name: 'Confluence',
    category: 'tools',
    icon: 'confluence',
    docUrl: 'https://www.atlassian.com/software/confluence'
  },
  { name: 'Bitbucket', category: 'tools', icon: 'bitbucket', docUrl: 'https://bitbucket.org' },
  { name: 'VS Code', category: 'tools', icon: 'vscode', docUrl: 'https://code.visualstudio.com' },
  { name: 'pytest', category: 'tools', icon: 'pytest', docUrl: 'https://pytest.org' },
  {
    name: 'OpenTelemetry',
    category: 'tools',
    icon: 'opentelemetry',
    docUrl: 'https://opentelemetry.io/docs/'
  },
  {
    name: 'Jaeger',
    category: 'tools',
    icon: 'jaegertracing',
    docUrl: 'https://www.jaegertracing.io/docs/'
  },
  {
    name: 'Prometheus',
    category: 'tools',
    icon: 'prometheus',
    docUrl: 'https://prometheus.io/docs/'
  }
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages & Frameworks',
    skills: skills.filter((s) => s.category === 'languages')
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & DevOps',
    skills: skills.filter((s) => s.category === 'cloud-devops')
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    skills: skills.filter((s) => s.category === 'ai-ml')
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    skills: skills.filter((s) => s.category === 'tools')
  }
]
