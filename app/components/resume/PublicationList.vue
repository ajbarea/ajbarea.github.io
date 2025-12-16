<script setup lang="ts">
import type { Publication } from '~/types'

interface Props {
  publications: Publication[]
}

defineProps<Props>()

function getStatusBadgeClass(status: Publication['status']): string {
  const classes: Record<Publication['status'], string> = {
    published: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    'under-review': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    accepted: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
  }
  return classes[status]
}

function getStatusLabel(status: Publication['status']): string {
  const labels: Record<Publication['status'], string> = {
    published: 'Published',
    'under-review': 'Under Review',
    accepted: 'Accepted'
  }
  return labels[status]
}

function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return ''
  if (authors.length === 1) return authors[0] ?? ''
  if (authors.length === 2) return authors.join(' and ')
  const lastAuthor = authors[authors.length - 1] ?? ''
  return authors.slice(0, -1).join(', ') + ', and ' + lastAuthor
}
</script>

<template>
  <section v-if="publications.length">
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <svg
        class="w-5 h-5 text-primary-600 dark:text-primary-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
      Publications
    </h2>
    <div class="space-y-4">
      <article
        v-for="pub in publications"
        :key="pub.id"
        class="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700"
      >
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white flex-1">
            {{ pub.title }}
          </h3>
          <span
            :class="[
              'px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap',
              getStatusBadgeClass(pub.status)
            ]"
          >
            {{ getStatusLabel(pub.status) }}
          </span>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {{ formatAuthors(pub.authors) }}
        </p>

        <div
          class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
        >
          <span class="font-medium text-primary-600 dark:text-primary-400">
            {{ pub.venue }}
          </span>
          <span>{{ pub.year }}</span>
          <a
            v-if="pub.doi"
            :href="`https://doi.org/${pub.doi}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 dark:text-primary-400 hover:underline"
          >
            DOI: {{ pub.doi }}
          </a>
          <a
            v-if="pub.url"
            :href="pub.url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View
          </a>
        </div>
      </article>
    </div>
  </section>
</template>
