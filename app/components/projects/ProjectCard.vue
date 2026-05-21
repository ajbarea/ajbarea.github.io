<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Project, ProjectType } from '~/types'
import ProjectModal from './ProjectModal.vue'

interface Props {
  project: Project
}

const props = defineProps<Props>()

const imageError = ref(false)
const modalOpen = ref(false)
const titleBtnRef = ref<HTMLButtonElement | null>(null)

function handleImageError() {
  imageError.value = true
}

function openModal() {
  modalOpen.value = true
}

// Restore focus to the title button when the modal closes — useFocusTrap's
// returnFocusOnDeactivate handles this internally, but we double-tap here
// in case the modal was closed via the backdrop click rather than the
// close button (focus trap deactivate path differs).
function handleOpenChange(value: boolean) {
  modalOpen.value = value
  if (!value) {
    titleBtnRef.value?.focus()
  }
}

const typeSortOrder: Record<ProjectType, number> = {
  'ai-ml': 0,
  'federated-learning': 1,
  'full-stack': 2,
  robotics: 3
}

const sortedTypes = computed(() =>
  [...props.project.types].sort((a, b) => typeSortOrder[a] - typeSortOrder[b])
)

function getTypeBadgeClasses(type: ProjectType): string {
  const classes: Record<ProjectType, string> = {
    'ai-ml': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'federated-learning': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    'full-stack': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    robotics: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
  }
  return classes[type]
}
</script>

<template>
  <article
    class="project-card group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl focus-within:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col"
  >
    <!-- Thumbnail -->
    <div
      class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden"
    >
      <img
        v-if="project.thumbnailUrl && !imageError"
        :src="project.thumbnailUrl"
        :alt="$t('projects.page.thumbnailAlt', { title: $t('projects.' + project.id + '.title') })"
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

      <!-- Project Type Badges -->
      <div class="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5">
        <span
          v-for="type in sortedTypes"
          :key="type"
          :class="['px-2.5 py-1 text-xs font-semibold rounded-full', getTypeBadgeClasses(type)]"
        >
          {{ $t('projects.types.' + type) }}
        </span>
      </div>

      <!-- Direct-link indicators. These are tiny shortcut buttons sitting
           above the title's ::after pseudo-content overlay (z-2 vs z-1) so
           clicks on them open the URL instead of the modal. Visually
           subdued (smaller than the type badges), icon-only so they read
           as indicators not call-to-actions. Order matches intuitive
           visitor priority: docs site (polished home) > github (source) >
           youtube (demo). -->
      <div class="absolute bottom-3 left-3 flex items-center gap-1.5 z-[2]">
        <a
          v-if="project.docsUrl"
          :href="project.docsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary-600/90 text-white hover:bg-primary-600 hover:scale-110 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          :title="$t('projects.page.docsAria', { title: $t('projects.' + project.id + '.title') })"
          :aria-label="
            $t('projects.page.docsAria', { title: $t('projects.' + project.id + '.title') })
          "
        >
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-900/80 text-white hover:bg-gray-900 hover:scale-110 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          :title="
            $t('projects.page.githubAria', { title: $t('projects.' + project.id + '.title') })
          "
          :aria-label="
            $t('projects.page.githubAria', { title: $t('projects.' + project.id + '.title') })
          "
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
        </a>
        <a
          v-if="project.youtubeUrl"
          :href="project.youtubeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-600/90 text-white hover:bg-red-600 hover:scale-110 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          :title="$t('projects.page.videoAria', { title: $t('projects.' + project.id + '.title') })"
          :aria-label="
            $t('projects.page.videoAria', { title: $t('projects.' + project.id + '.title') })
          "
        >
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- Content (uniform height across cards now that tags + buttons live in modal) -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
        <button
          ref="titleBtnRef"
          type="button"
          class="project-card__title text-left transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400 focus-visible:outline-none focus-visible:underline"
          :aria-haspopup="'dialog'"
          :aria-label="
            $t('projects.page.viewDetailsAria', { title: $t('projects.' + project.id + '.title') })
          "
          @click="openModal"
        >
          {{ $t('projects.' + project.id + '.title') }}
        </button>
      </h3>

      <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
        {{ $t('projects.' + project.id + '.description') }}
      </p>
    </div>

    <!-- Detail modal (rendered via Teleport inside the component) -->
    <ProjectModal :project="project" :open="modalOpen" @update:open="handleOpenChange" />
  </article>
</template>

<style scoped>
/* Pseudo-content trick (2026 a11y best practice for accessible card grids):
   the only interactive element on the card is the title <button>, but its
   ::after stretches over the whole article so the entire card is a hit
   target. Screen readers only announce one link (the title); sighted/touch
   users get the full card area. Refs:
   - https://kittygiraudel.com/2022/04/02/accessible-cards/
   - https://www.damianwajer.com/blog/accessible-card-component/ */
.project-card__title::after {
  content: '';
  position: absolute;
  inset: 0;
  cursor: pointer;
  z-index: 1;
}

/* Without this, sibling interactive children (none today, but a future
   addition like a "favorite" toggle) couldn't sit above the ::after layer
   to receive clicks. Keeping the rule here documents the contract: any
   inline action that must remain clickable needs position+z-index above 1. */
.project-card > *:not(.p-5):not(.relative) {
  position: relative;
}
</style>
