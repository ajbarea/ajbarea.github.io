<script setup lang="ts">
import type { TimelineEntry } from '~/types'
import TimelineEntryComponent from './TimelineEntry.vue'

interface Props {
  entries: TimelineEntry[]
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Experience & Education'
})
</script>

<template>
  <section class="py-6 sm:py-8" aria-labelledby="timeline-heading">
    <h2
      id="timeline-heading"
      class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
    >
      {{ title }}
    </h2>
    <div class="relative" role="list" aria-label="Timeline entries">
      <TimelineEntryComponent v-for="entry in entries" :key="entry.id" :entry="entry" />
    </div>
  </section>
</template>
