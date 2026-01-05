<script setup lang="ts">
import type { Publication } from '~/types'
import { useClipboard } from '~/composables/useClipboard'

interface Props {
  publications: Publication[]
  highlightAuthor?: string
  contactEmail?: string
}

const props = withDefaults(defineProps<Props>(), {
  highlightAuthor: 'Arnaldo Barea',
  contactEmail: 'ajbareaa@gmail.com'
})

const clipboard = useClipboard()

const expandedAbstracts = ref<Set<string>>(new Set())

function toggleAbstract(id: string) {
  if (expandedAbstracts.value.has(id)) {
    expandedAbstracts.value.delete(id)
  } else {
    expandedAbstracts.value.add(id)
  }
  // Force reactivity update
  expandedAbstracts.value = new Set(expandedAbstracts.value)
}

function isExpanded(id: string): boolean {
  return expandedAbstracts.value.has(id)
}

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

function formatAuthorsWithHighlight(authors: string[]): { text: string; highlighted: boolean }[] {
  const result: { text: string; highlighted: boolean }[] = []

  authors.forEach((author, index) => {
    const isHighlighted = author === props.highlightAuthor
    const isLast = index === authors.length - 1
    const isSecondToLast = index === authors.length - 2

    result.push({ text: author, highlighted: isHighlighted })

    if (!isLast) {
      if (isSecondToLast && authors.length > 1) {
        result.push({ text: ', and ', highlighted: false })
      } else {
        result.push({ text: ', ', highlighted: false })
      }
    }
  })

  return result
}

function requestPaper(_pub: Publication): void {
  clipboard.copyEmail(props.contactEmail)
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
        <!-- Title and Status Badge -->
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

        <!-- Authors with my name highlighted -->
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <template v-for="(part, index) in formatAuthorsWithHighlight(pub.authors)" :key="index">
            <strong v-if="part.highlighted" class="text-gray-900 dark:text-white font-semibold">{{
              part.text
            }}</strong>
            <span v-else>{{ part.text }}</span>
          </template>
        </p>

        <!-- Keywords Tags -->
        <div v-if="pub.keywords?.length" class="flex flex-wrap gap-1.5 mb-3">
          <span
            v-for="keyword in pub.keywords"
            :key="keyword"
            class="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
          >
            {{ keyword }}
          </span>
        </div>

        <!-- Venue, Year, and Links -->
        <div
          class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3"
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
          <!-- Request Paper button for under-review papers -->
          <button
            v-if="pub.status === 'under-review' && !pub.url"
            type="button"
            class="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
            @click="requestPaper(pub)"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Request Paper
          </button>
        </div>

        <!-- Expandable Abstract -->
        <div v-if="pub.abstract">
          <button
            type="button"
            class="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            @click="toggleAbstract(pub.id)"
          >
            <svg
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'rotate-90': isExpanded(pub.id) }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            {{ isExpanded(pub.id) ? 'Hide Abstract' : 'Show Abstract' }}
          </button>
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            leave-active-class="transition-all duration-150 ease-in"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="isExpanded(pub.id)" class="mt-3 overflow-hidden">
              <p
                class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-4 border-l-2 border-primary-200 dark:border-primary-700"
              >
                {{ pub.abstract }}
              </p>
            </div>
          </Transition>
        </div>
      </article>
    </div>
  </section>
</template>
