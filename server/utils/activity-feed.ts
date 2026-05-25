import { Feed } from 'feed'
import enMessages from '../../i18n/locales/en.json'
import { buildActivityItems, type FeedMessages } from '../../app/utils/activity-feed'
import { publications } from '../../app/data/publications'
import { hackathons } from '../../app/data/hackathons'
import { conferences } from '../../app/data/conferences'

// research(2026-05): a Nitro server route has no useI18n(), so the feed
// resolves titles/descriptions from the imported en.json directly via the
// shared pure builder. The feed is English-only (the default locale) —
// subscribers want "what's new", not localized variants.
// Source: https://nuxt.com/docs/4.x/getting-started/server
const SITE_URL = 'https://ajbarea.github.io' // mirrors `site.url` in nuxt.config.ts
const FEED_TITLE = 'AJ Barea · Research & Activity'
const FEED_DESCRIPTION = 'Publications, hackathons, and conference talks from AJ Barea.'

// Build the feed once; the /rss.xml and /atom.xml routes render it via
// feed.rss2() / feed.atom1() respectively (one builder, no duplication).
export function buildActivityFeed(): Feed {
  const items = buildActivityItems({
    messages: enMessages as unknown as FeedMessages,
    publications,
    hackathons,
    conferences,
    siteUrl: SITE_URL
  })

  const feed = new Feed({
    title: FEED_TITLE,
    description: FEED_DESCRIPTION,
    id: `${SITE_URL}/`,
    link: `${SITE_URL}/`,
    language: 'en',
    copyright: `© ${new Date().getFullYear()} AJ Barea`,
    author: { name: 'AJ Barea', link: SITE_URL },
    updated: items[0]?.date ?? new Date()
  })

  for (const item of items) {
    feed.addItem({
      title: item.title,
      id: item.id,
      link: item.link,
      description: item.description,
      date: item.date,
      category: [{ name: item.category }]
    })
  }

  return feed
}
