<script setup lang="ts">
import type { TimelineEntry } from '~/types'

interface Props {
  entry: TimelineEntry
}

defineProps<Props>()

function getIconPath(icon: string): string {
  const defaultIcon =
    'M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z'
  const icons: Record<string, string> = {
    work: defaultIcon,
    education: 'M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z',
    research:
      'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
    teaching:
      'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z',
    award:
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  }
  return icons[icon] ?? defaultIcon
}

function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    professional: 'bg-blue-500',
    education: 'bg-green-500',
    research: 'bg-purple-500',
    teaching: 'bg-orange-500',
    award: 'bg-yellow-500'
  }
  return colors[type] || 'bg-gray-500'
}
</script>

<template>
  <article class="relative pl-8 pb-6 sm:pb-8 last:pb-0" role="listitem">
    <!-- Timeline line -->
    <div
      class="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"
      aria-hidden="true"
    ></div>

    <!-- Timeline dot with icon -->
    <div
      :class="[
        'absolute left-0 w-6 h-6 rounded-full flex items-center justify-center',
        getTypeColor(entry.type)
      ]"
      aria-hidden="true"
    >
      <svg
        class="w-3.5 h-3.5 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path :d="getIconPath(entry.icon)" />
      </svg>
    </div>

    <!-- Content -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
    >
      <div
        class="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-1 sm:gap-2 mb-2"
      >
        <div class="flex-1 min-w-0">
          <h3
            class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex flex-wrap items-center gap-2"
          >
            <span>{{ entry.title }}</span>
            <span
              v-if="entry.isCurrent"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500 dark:bg-green-600 text-white shadow-sm"
              role="status"
            >
              Current
            </span>
          </h3>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {{ entry.subtitle }} · {{ entry.organization }}
          </p>
        </div>
        <time class="text-xs sm:text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap">
          {{ entry.timeframe }}
        </time>
      </div>

      <p class="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-3">
        {{ entry.description }}
      </p>

      <!-- Skill tags -->
      <ul
        v-if="entry.skills && entry.skills.length > 0"
        class="flex flex-wrap gap-1.5 sm:gap-2"
        aria-label="Skills"
      >
        <li
          v-for="skill in entry.skills"
          :key="skill"
          class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          {{ skill }}
        </li>
      </ul>
    </div>
  </article>
</template>
