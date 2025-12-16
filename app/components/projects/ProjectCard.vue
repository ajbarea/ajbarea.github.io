<script setup lang="ts">
import { ref } from 'vue'
import type { Project } from '~/types'

interface Props {
  project: Project
}

defineProps<Props>()

const imageError = ref(false)

function handleImageError() {
  imageError.value = true
}

function getTypeLabel(type: Project['type']): string {
  const labels: Record<Project['type'], string> = {
    'ai-ml': 'AI/ML',
    'full-stack': 'Full-Stack',
    research: 'Research',
    cloud: 'Cloud'
  }
  return labels[type]
}

function getTypeBadgeClasses(type: Project['type']): string {
  const classes: Record<Project['type'], string> = {
    'ai-ml': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'full-stack': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    research: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    cloud: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
  }
  return classes[type]
}
</script>

<template>
  <article
    class="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full"
  >
    <!-- Thumbnail -->
    <div
      class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden"
    >
      <img
        v-if="project.thumbnailUrl && !imageError"
        :src="project.thumbnailUrl"
        :alt="`${project.title} thumbnail`"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <svg
          class="w-16 h-16 text-gray-300 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </div>

      <!-- Project Type Badge -->
      <span
        :class="[
          'absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full',
          getTypeBadgeClasses(project.type)
        ]"
      >
        {{ getTypeLabel(project.type) }}
      </span>

      <!-- YouTube Indicator -->
      <span
        v-if="project.youtubeUrl"
        class="absolute top-3 left-3 p-2 bg-red-600 text-white rounded-full shadow-md"
        title="Video demo available"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
          />
        </svg>
      </span>
    </div>

    <!-- Content -->
    <div class="flex-1 p-5 flex flex-col">
      <h3
        class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
      >
        {{ project.title }}
      </h3>

      <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
        {{ project.description }}
      </p>

      <!-- Technology Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.technologies.slice(0, 5)"
          :key="tech"
          class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.technologies.length > 5"
          class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-md"
        >
          +{{ project.technologies.length - 5 }}
        </span>
      </div>

      <!-- Action Buttons -->
      <nav
        class="flex flex-wrap items-center gap-2 sm:gap-3 pt-3 border-t border-gray-100 dark:border-gray-700"
        aria-label="Project links"
      >
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          :aria-label="`View demo for ${project.title}`"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          Demo
        </a>

        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          :aria-label="`View GitHub repository for ${project.title}`"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
          GitHub
        </a>

        <a
          v-if="project.youtubeUrl"
          :href="project.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          :aria-label="`Watch video demo for ${project.title}`"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
          </svg>
          Video
        </a>
      </nav>
    </div>
  </article>
</template>
