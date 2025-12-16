<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project } from '~/types'
import { projects } from '~/data/projects'

type FilterType = Project['type'] | 'all'

const activeFilter = ref<FilterType>('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter((project) => project.type === activeFilter.value)
})

useHead({
  title: 'Projects | AJ Barea',
  meta: [
    {
      name: 'description',
      content:
        "Explore AJ Barea's portfolio of software projects including AI/ML applications, full-stack development, cloud solutions, and research work.",
    },
    { property: 'og:title', content: 'Projects | AJ Barea' },
    {
      property: 'og:description',
      content:
        "Explore AJ Barea's portfolio of software projects including AI/ML applications, full-stack development, cloud solutions, and research work.",
    },
    { property: 'og:image', content: '/images/og-image.png' },
    { property: 'og:url', content: 'https://ajbarea.github.io/projects' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Projects | AJ Barea' },
    {
      name: 'twitter:description',
      content:
        "Explore AJ Barea's portfolio of software projects including AI/ML applications, full-stack development, and cloud solutions.",
    },
  ],
})
</script>

<template>
  <main class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Projects</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of my work spanning AI/ML, full-stack development, cloud solutions, and
          research.
        </p>
      </header>

      <!-- Filter -->
      <div class="mb-10">
        <ProjectsProjectFilter v-model="activeFilter" />
      </div>

      <!-- Projects Grid -->
      <div
        v-if="filteredProjects.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        <ProjectsProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
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
          No projects found for this category.
        </p>
        <button
          type="button"
          class="mt-4 min-h-[44px] px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
          @click="activeFilter = 'all'"
        >
          View all projects
        </button>
      </div>
    </div>
  </main>
</template>
