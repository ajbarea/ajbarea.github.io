import { buildActivityFeed } from '../utils/activity-feed'

// Atom 1.0 (RFC 4287) — the more robust IETF-standard format, offered
// alongside RSS per the "support both" syndication recommendation.
// Prerendered to /atom.xml at build (see nitro.prerender.routes).
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/atom+xml; charset=utf-8')
  return buildActivityFeed().atom1()
})
