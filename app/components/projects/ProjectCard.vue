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
