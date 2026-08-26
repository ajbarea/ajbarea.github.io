export interface Sister {
  id: string
  url: string
}

// Order is deliberate: the two systems with published research first, then the
// testbeds, then the lab site and the tooling. No `role` field any more; it fed
// a coloured badge that labelled each repo with a single vague noun
// (Innovation, Research, Performance) that the description already said better.
export const sisters: Sister[] = [
  {
    id: 'kourai-khryseai',
    url: 'https://github.com/ajbarea/kourai-khryseai'
  },
  {
    id: 'phalanx-fl',
    url: 'https://github.com/ajbarea/phalanx-fl'
  },
  {
    id: 'pharos',
    url: 'https://github.com/ajbarea/pharos'
  },
  {
    id: 'vfl',
    url: 'https://github.com/ajbarea/velocity-fl'
  },
  {
    id: 'ldqis',
    url: 'https://github.com/ajbarea/ldqis'
  },
  {
    id: 'techne',
    url: 'https://github.com/ajbarea/techne'
  },
  {
    id: 'orchestrate-triage',
    url: 'https://github.com/ajbarea/orchestrate-triage'
  }
]
