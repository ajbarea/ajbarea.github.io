<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProjectType } from '~/types'
import { projects } from '~/data/projects'

type FilterType = ProjectType | 'all'

const activeFilter = ref<FilterType>('all')
const { t } = useI18n()
const i18nHead = useLocaleHead({ seo: true })

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter((project) => project.types.includes(activeFilter.value))
})

useHead(() => ({
  title: t('meta.projectsTitle'),
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    ...(i18nHead.value.meta || []),
    { name: 'description', content: t('meta.projectsDescription') },
    { property: 'og:title', content: t('meta.projectsTitle') },
    { property: 'og:description', content: t('meta.projectsDescription') },
    {
      property: 'og:image',
      content: 'https://ajbarea.github.io/images/profile/profile.webp'
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('meta.projectsTitle') },
    { name: 'twitter:description', content: t('meta.projectsTwitterDescription') }
  ]
}))
</script>

<template>
  <main class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{ $t('projects.page.heading') }}
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {{ $t('projects.page.lead') }}
        </p>
      </header>

      <!-- Filter -->
      <div class="mb-10">
        <ProjectsProjectFilter v-model="activeFilter" />
      </div>

      <!-- Projects Grid -->
      <div
        v-if="filteredProjects.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <ProjectsProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12 sm:py-16" role="status" aria-live="polite">
        <svg
          class="w-12 sm:w-16 h-12 sm:h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
          {{ $t('projects.page.emptyState') }}
        </p>
        <button
          type="button"
          class="mt-4 min-h-[44px] px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          @click="activeFilter = 'all'"
        >
          {{ $t('projects.page.viewAll') }}
        </button>
      </div>
    </div>
  </main>
</template>
