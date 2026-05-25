import { buildActivityFeed } from '../utils/activity-feed'

// RSS 2.0 — the broadest-supported feed format (podcast + reader ecosystem).
// Prerendered to /rss.xml at build (see nitro.prerender.routes in nuxt.config).
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return buildActivityFeed().rss2()
})
