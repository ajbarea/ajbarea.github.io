<script setup lang="ts">
import type { ActivityHighlight } from '~/types'

interface Props {
  highlights: ActivityHighlight[]
}

defineProps<Props>()

const kindColor: Record<ActivityHighlight['kind'], string> = {
  publication: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  hackathon: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  conference: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
}
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
