<script setup lang="ts">
import { computed } from 'vue'
import type { ActivityHighlight } from '~/types'
import { activityHighlightRefs } from '~/data/highlights'
import { publications } from '~/data/publications'
import { hackathons } from '~/data/hackathons'
import { conferences } from '~/data/conferences'

const { t, te } = useI18n()

const kindColor: Record<ActivityHighlight['kind'], string> = {
  publication: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  hackathon: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  conference: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : text
}

const highlights = computed<ActivityHighlight[]>(() => {
  const items: ActivityHighlight[] = []
  for (const ref of activityHighlightRefs) {
    const titleOverride = `highlights.overrides.${ref.id}.title`
    const descOverride = `highlights.overrides.${ref.id}.description`

    if (ref.kind === 'publication') {
      const p = publications.find((x) => x.id === ref.id)
      if (!p) continue
      items.push({
        id: p.id,
        kind: 'publication',
        title: te(titleOverride) ? t(titleOverride) : t(`publications.${p.id}.title`),
        meta: `${p.venue} · ${p.year}`,
        description: te(descOverride)
          ? t(descOverride)
          : firstSentence(t(`publications.${p.id}.abstract`)),
        result: p.doi
          ? t('publications.statuses.doi')
          : p.status === 'accepted'
            ? t('publications.statuses.accepted')
            : undefined,
        url: p.url
      })
    } else if (ref.kind === 'hackathon') {
      const h = hackathons.find((x) => x.id === ref.id)
      if (!h) continue
      items.push({
        id: h.id,
        kind: 'hackathon',
        title: te(titleOverride) ? t(titleOverride) : h.name,
        meta: `${t(`hackathons.types.${h.type}`)} · ${h.organizer} · ${h.date}`,
        description: te(descOverride)
          ? t(descOverride)
          : firstSentence(t(`hackathons.${h.id}.description`)),
        result: t(`hackathons.${h.id}.result`),
        url: h.links.docs || h.links.repo || h.links.linkedin
      })
    } else {
      const c = conferences.find((x) => x.id === ref.id)
      if (!c) continue
      items.push({
        id: c.id,
        kind: 'conference',
        title: te(titleOverride) ? t(titleOverride) : t(`conferences.${c.id}.title`),
        meta: `${t(`conferences.formats.${c.format}`)} · ${c.name} · ${c.date}`,
        description: te(descOverride)
          ? t(descOverride)
          : firstSentence(t(`conferences.${c.id}.description`)),
        url: c.writeupUrl || c.eventUrl
      })
    }
  }
  return items
})
</script>

<template>
  <section aria-labelledby="activity-2026-heading" class="mb-12">
    <h2
      id="activity-2026-heading"
      class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
    >
      {{ $t('sections.highlights') }}
    </h2>
    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
      <li v-for="h in highlights" :key="h.id" class="list-none">
        <component
          :is="h.url ? 'a' : 'article'"
          :href="h.url || undefined"
          :target="h.url ? '_blank' : undefined"
          :rel="h.url ? 'noopener noreferrer' : undefined"
          class="flex h-full flex-col bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              :class="[
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                kindColor[h.kind]
              ]"
            >
              {{ $t('activity.kind.' + h.kind) }}
            </span>
            <span
              v-if="h.result"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 whitespace-nowrap"
            >
              {{ h.result }}
            </span>
          </div>
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
            {{ h.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {{ h.meta }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {{ h.description }}
          </p>
        </component>
      </li>
    </ul>
  </section>
</template>
