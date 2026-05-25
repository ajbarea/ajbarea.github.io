export interface Sister {
  id: string
  role: 'innovation' | 'research' | 'performance' | 'governance' | 'lab-identity' | 'applied'
  url: string
}

export const sisters: Sister[] = [
  {
    id: 'kourai-khryseai',
    role: 'innovation',
    url: 'https://github.com/ajbarea/kourai-khryseai'
  },
  {
    id: 'phalanx-fl',
    role: 'research',
    url: 'https://github.com/ajbarea/phalanx-fl'
  },
  {
    id: 'vfl',
    role: 'performance',
    url: 'https://github.com/ajbarea/vFL'
  },
  {
    id: 'ldqis',
    role: 'lab-identity',
    url: 'https://github.com/ajbarea/ldqis'
  },
  {
    id: 'techne',
    role: 'governance',
    url: 'https://github.com/ajbarea/techne'
  },
  {
    id: 'orchestrate-triage',
    role: 'applied',
    url: 'https://github.com/ajbarea/orchestrate-triage'
  }
]
