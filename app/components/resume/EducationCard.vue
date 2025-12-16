<script setup lang="ts">
import type { Education } from '~/types'

interface Props {
  education: Education[]
}

defineProps<Props>()
</script>

<template>
  <section>
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <svg
        class="w-5 h-5 text-primary-600 dark:text-primary-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        />
      </svg>
      Education
    </h2>
    <div class="space-y-4">
      <article
        v-for="(edu, idx) in education"
        :key="idx"
        class="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700"
      >
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ edu.degree }} in {{ edu.field }}
            </h3>
            <p class="text-primary-600 dark:text-primary-400 font-medium">
              {{ edu.institution }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ edu.location }}
            </p>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400 sm:text-right">
            <p>{{ edu.graduationDate }}</p>
            <p class="font-medium text-gray-700 dark:text-gray-300">
              GPA: {{ edu.gpa.toFixed(2) }}/{{ edu.maxGpa.toFixed(1) }}
            </p>
          </div>
        </div>

        <!-- Relevant Coursework -->
        <div v-if="edu.relevantCoursework?.length" class="mt-3">
          <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Relevant Coursework
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="course in edu.relevantCoursework"
              :key="course"
              class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
            >
              {{ course }}
            </span>
          </div>
        </div>

        <!-- Capstone Research -->
        <div
          v-if="edu.capstoneResearch"
          class="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
        >
          <h4 class="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">
            Capstone Research
          </h4>
          <p class="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {{ edu.capstoneResearch.title }}
          </p>
          <p
            v-if="edu.capstoneResearch.advisor"
            class="text-xs text-gray-500 dark:text-gray-400 mt-1"
          >
            Advisor: {{ edu.capstoneResearch.advisor }}
          </p>
          <div v-if="edu.capstoneResearch.focus?.length" class="flex flex-wrap gap-1 mt-2">
            <span
              v-for="focus in edu.capstoneResearch.focus"
              :key="focus"
              class="px-2 py-0.5 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded"
            >
              {{ focus }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
