<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'

const resumeStore = useResumeStore()
</script>

<template>
  <div
    class="flex items-center justify-center gap-1 sm:gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg"
    role="tablist"
    aria-label="Resume view options"
  >
    <button
      :class="[
        'min-h-[44px] px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500',
        resumeStore.isIndustryView
          ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
      ]"
      role="tab"
      :aria-selected="resumeStore.isIndustryView"
      aria-controls="resume-content"
      @click="resumeStore.setViewMode('industry')"
    >
      <span class="flex items-center gap-1.5 sm:gap-2">
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
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span>Industry</span>
      </span>
    </button>
    <button
      :class="[
        'min-h-[44px] px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500',
        resumeStore.isResearchView
          ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
          : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
      ]"
      role="tab"
      :aria-selected="resumeStore.isResearchView"
      aria-controls="resume-content"
      @click="resumeStore.setViewMode('research')"
    >
      <span class="flex items-center gap-1.5 sm:gap-2">
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
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <span>Research</span>
      </span>
    </button>
  </div>
</template>
