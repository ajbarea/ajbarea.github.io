<script setup lang="ts">
import { useResumeStore } from '~/stores/resume'
import { profile, education } from '~/data/profile'
import { professionalExperience, researchExperience, teachingExperience } from '~/data/timeline'
import { publications } from '~/data/publications'
import { skillCategories } from '~/data/skills'

const resumeStore = useResumeStore()

useHead({
  title: 'Resume | AJ Barea',
  meta: [
    {
      name: 'description',
      content:
        "AJ Barea's professional resume - Software Engineer with expertise in full-stack development, AI/ML, and cloud solutions.",
    },
    { property: 'og:title', content: 'Resume | AJ Barea' },
    {
      property: 'og:description',
      content:
        'Professional resume showcasing software engineering experience, research, and technical skills.',
    },
    { property: 'og:image', content: '/images/og-image.png' },
    { property: 'og:url', content: 'https://ajbarea.github.io/resume' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Resume | AJ Barea' },
    {
      name: 'twitter:description',
      content:
        'Professional resume showcasing software engineering experience, research, and technical skills.',
    },
  ],
})

function downloadResume(type: 'industry' | 'research') {
  const filename =
    type === 'industry' ? 'AJ_Barea_Industry_Resume.pdf' : 'AJ_Barea_Research_Resume.pdf'
  window.open(`/documents/${filename}`, '_blank')
}
</script>

<template>
  <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header with Contact Info -->
      <header class="text-center mb-8 print:mb-4">
        <h1
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 print:text-2xl"
        >
          {{ profile.name }}
        </h1>
        <p class="text-lg text-primary-600 dark:text-primary-400 mb-3 print:text-base">
          {{ profile.title }}
        </p>

        <!-- Contact Info -->
        <div
          class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400 print:text-xs"
        >
          <a
            :href="`mailto:${profile.contact.email}`"
            class="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {{ profile.contact.email }}
          </a>
          <span class="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
          <a
            :href="`tel:${profile.contact.phone.replace(/[^0-9+]/g, '')}`"
            class="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {{ profile.contact.phone }}
          </a>
          <span class="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
          <a
            :href="`https://github.com/${profile.contact.github}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            {{ profile.contact.github }}
          </a>
          <span class="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>
          <a
            :href="`https://youtube.com/${profile.contact.youtube}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
              />
              <path fill="white" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            {{ profile.contact.youtube }}
          </a>
        </div>
      </header>

      <!-- View Toggle & Actions (hidden in print) -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 no-print">
        <ResumeViewToggle />

        <button
          @click="downloadResume(resumeStore.viewMode)"
          class="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          :aria-label="`Download ${resumeStore.viewMode} resume as PDF`"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span class="hidden xs:inline">Download PDF</span>
          <span class="xs:hidden">PDF</span>
        </button>
      </div>

      <!-- Research Interests (Research View Only) -->
      <section
        v-if="resumeStore.isResearchView && profile.researchInterests?.length"
        class="mb-8 print:mb-4"
      >
        <h2
          class="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 print:text-lg"
        >
          <svg
            class="w-5 h-5 text-purple-600 dark:text-purple-400 no-print"
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
          Research Interests
        </h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="interest in profile.researchInterests"
            :key="interest"
            class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
          >
            {{ interest }}
          </span>
        </div>
      </section>

      <!-- Main Content -->
      <div
        id="resume-content"
        class="space-y-6 sm:space-y-8 print:space-y-4"
        role="tabpanel"
        :aria-label="`${resumeStore.viewMode} resume content`"
      >
        <!-- Experience Section -->
        <ResumeExperienceList
          :professional-experience="professionalExperience"
          :research-experience="researchExperience"
          :teaching-experience="teachingExperience"
          :view-mode="resumeStore.viewMode"
        />

        <!-- Publications (Research View Only) -->
        <ResumePublicationList v-if="resumeStore.isResearchView" :publications="publications" />

        <!-- Education -->
        <ResumeEducationCard :education="education" />

        <!-- Skills -->
        <ResumeSkillsGrid :categories="skillCategories" />
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }

  main {
    padding: 0;
    min-height: auto;
  }

  :deep(.bg-white),
  :deep(.dark\:bg-gray-800) {
    background-color: white !important;
    border: 1px solid #e5e7eb !important;
  }

  :deep(.text-gray-900),
  :deep(.dark\:text-white) {
    color: black !important;
  }

  :deep(.text-gray-600),
  :deep(.text-gray-500),
  :deep(.dark\:text-gray-300),
  :deep(.dark\:text-gray-400) {
    color: #374151 !important;
  }

  :deep(.text-primary-600),
  :deep(.dark\:text-primary-400) {
    color: #2563eb !important;
  }

  :deep(a[href])::after {
    content: none;
  }
}
</style>
