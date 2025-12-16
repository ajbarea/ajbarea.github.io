<script setup lang="ts">
import type { ProfessionalExperience, ResearchExperience, TeachingExperience } from '~/types'

interface Props {
  professionalExperience?: ProfessionalExperience[]
  researchExperience?: ResearchExperience[]
  teachingExperience?: TeachingExperience[]
  viewMode: 'industry' | 'research'
}

defineProps<Props>()
</script>

<template>
  <section class="space-y-6">
    <!-- Professional Experience (Industry View) -->
    <div v-if="viewMode === 'industry' && professionalExperience?.length">
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Professional Experience
      </h2>
      <div class="space-y-4">
        <article
          v-for="exp in professionalExperience"
          :key="exp.id"
          class="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
              >
                {{ exp.title }}
                <span
                  v-if="exp.isCurrent"
                  class="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full"
                >
                  Current
                </span>
              </h3>
              <p class="text-primary-600 dark:text-primary-400 font-medium">
                {{ exp.company }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ exp.location }}
              </p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
              <p>{{ exp.startDate }} – {{ exp.endDate }}</p>
              <p class="capitalize">{{ exp.type }}</p>
            </div>
          </div>
          <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
            <li v-for="(bullet, idx) in exp.bullets" :key="idx">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </div>

    <!-- Research Experience (Research View) -->
    <div v-if="viewMode === 'research' && researchExperience?.length">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <svg
          class="w-5 h-5 text-purple-600 dark:text-purple-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Research Experience
      </h2>
      <div class="space-y-4">
        <article
          v-for="exp in researchExperience"
          :key="exp.id"
          class="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2"
              >
                {{ exp.title }}
                <span
                  v-if="exp.isCurrent"
                  class="px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full"
                >
                  Current
                </span>
              </h3>
              <p class="text-purple-600 dark:text-purple-400 font-medium">
                {{ exp.institution }}
              </p>
              <p v-if="exp.project" class="text-sm text-gray-500 dark:text-gray-400">
                Project: {{ exp.project }}
              </p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
              <p>{{ exp.startDate }} – {{ exp.endDate }}</p>
            </div>
          </div>
          <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
            <li v-for="(bullet, idx) in exp.bullets" :key="idx">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </div>

    <!-- Teaching Experience (Research View) -->
    <div v-if="viewMode === 'research' && teachingExperience?.length">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <svg
          class="w-5 h-5 text-blue-600 dark:text-blue-400"
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
        Teaching Experience
      </h2>
      <div class="space-y-4">
        <article
          v-for="exp in teachingExperience"
          :key="exp.id"
          class="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ exp.title }}
              </h3>
              <p class="text-blue-600 dark:text-blue-400 font-medium">
                {{ exp.course }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ exp.institution }}
              </p>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
              <p>{{ exp.startDate }} – {{ exp.endDate }}</p>
            </div>
          </div>
          <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
            <li v-for="(bullet, idx) in exp.bullets" :key="idx">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
