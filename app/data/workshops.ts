import type { Workshop } from '~/types'

export const workshops: Workshop[] = [
  {
    id: 'aware-ai-talk-yanardag-2026',
    name: 'RIT AWARE-AI Research Talk: Pinar Yanardag Delul',
    organizer: 'RIT AWARE-AI',
    date: 'April 13, 2026',
    format: 'virtual',
    kind: 'research-talk',
    topic:
      'From Chaos to Control: The Art of Taming Generative AI. Interpretable generative models, latent-representation control, and human-AI collaboration.',
    facilitator: 'Pinar Yanardag Delul (Virginia Tech)'
  },
  {
    id: 'ai4ia-2026',
    name: 'AI4IA: Role-based Learning for AI-assisted Cyber Incident Analysis',
    organizer: 'RIT · Gonzaga · University of Rochester (NSF SaTC-EDU)',
    date: 'March 21, 2026',
    format: 'in-person',
    kind: 'training',
    topic:
      'One-day intensive on leveraging LLM-based assistants (MCP servers, system prompts) for SIEM log analysis, vulnerability interpretation, and incident-response workflows.',
    facilitator: 'S. Jay Yang (Gonzaga) and Justin Pelletier (RIT)'
  },
  {
    id: 'aware-ai-storytelling-2026',
    name: 'AWARE-AI Workshop: Storytelling Techniques to Communicate STEM Research',
    organizer: 'RIT AWARE-AI',
    date: 'March 19, 2026',
    format: 'virtual',
    kind: 'workshop',
    topic:
      'Storytelling mechanics and data visualization for jargon-free communication of STEM research to broad audiences.',
    facilitator: 'Ammina Kothari (Simmons University)',
    url: 'https://www.rit.edu/events/aware-ai-workshop-using-storytelling-techniques-communicate-stem-research-1'
  },
  {
    id: 'aware-ai-teamwork-2026',
    name: 'AWARE-AI Workshop: Teamwork and Collaborative Research II',
    organizer: 'RIT AWARE-AI',
    date: 'February 6, 2026',
    format: 'virtual',
    kind: 'workshop',
    topic: 'Teamwork and collaboration patterns in research settings (follow-on to Part I).',
    facilitator: 'Joy Olabisi (Georgia Tech)',
    url: 'https://www.rit.edu/events/aware-ai-workshop-teamwork-and-collaborative-research-ii'
  }
]
