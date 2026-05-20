<script setup lang="ts">
import type { TimelineEntry } from '~/types'
import TimelineEntryComponent from './TimelineEntry.vue'

interface Props {
  entries: TimelineEntry[]
  title?: string
}

defineProps<Props>()
</script>

<template>
  <section class="mb-12" aria-labelledby="timeline-heading">
    <h2
      id="timeline-heading"
      class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6"
    >
      {{ title || $t('sections.experience') }}
    </h2>
    <ul class="relative list-none p-0 m-0" :aria-label="$t('sections.experienceAria')">
      <li v-for="entry in entries" :key="entry.id" class="list-none last:[&>article]:pb-0">
        <TimelineEntryComponent :entry="entry" />
      </li>
    </ul>
  </section>
</template>
