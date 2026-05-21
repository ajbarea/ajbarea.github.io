<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import type { Project, ProjectType } from '~/types'

interface Props {
  project: Project | null
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const dialogRef = ref<HTMLElement | null>(null)
const closeBtnRef = ref<HTMLElement | null>(null)
const scrollLocked = useScrollLock(typeof window !== 'undefined' ? document.body : null)

const titleId = computed(() => `project-modal-title-${props.project?.id ?? 'none'}`)
const descId = computed(() => `project-modal-desc-${props.project?.id ?? 'none'}`)

const typeSortOrder: Record<ProjectType, number> = {
  'ai-ml': 0,
  'federated-learning': 1,
  'full-stack': 2,
  robotics: 3
}

const sortedTypes = computed<ProjectType[]>(() =>
  props.project ? [...props.project.types].sort((a, b) => typeSortOrder[a] - typeSortOrder[b]) : []
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

function close() {
  emit('update:open', false)
}

// Hand-rolled focus trap. @vueuse/integrations would give us useFocusTrap
// out of the box, but it pulls in focus-trap + tabbable as deps for a
// portfolio site that only needs the contract for one dialog. Cheaper to
// keep ownership: enumerate focusables inside the dialog on Tab, cycle.
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

function getFocusable(): HTMLElement[] {
  if (!dialogRef.value) return []
  return Array.from(dialogRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null
  )
}

function trapTab(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  const focusables = getFocusable()
  if (focusables.length === 0) return
  const first = focusables[0]!
  const last = focusables[focusables.length - 1]!
  const active = document.activeElement as HTMLElement | null
  if (e.shiftKey && active === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

onKeyStroke('Escape', () => {
  if (props.open) close()
})

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      scrollLocked.value = true
      await nextTick()
      closeBtnRef.value?.focus()
    } else {
      scrollLocked.value = false
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <!-- z-[60] sits above the sticky navigation (z-50) so the dialog and
           its backdrop receive pointer events; without this, clicks near
           the top of the viewport hit the nav instead of the modal. -->
      <div
        v-if="open && project"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        @click.self="close"
      >
        <!-- Backdrop. The click handler is attached HERE (not via @click.self
             on the parent) because the parent's .self predicate doesn't fire
             when a child element is the event target — the backdrop being
             a sibling of the dialog absorbs clicks before .self can apply.
             Keeping .self on the parent too so clicks in the flex padding
             gap (where neither backdrop nor dialog covers) also dismiss. -->
        <div
          data-test="modal-backdrop"
          class="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
          aria-hidden="true"
          @click="close"
        />

        <!-- Dialog -->
        <div
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="descId"
          class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
          @keydown="trapTab"
        >
          <!-- Header -->
          <header
            class="sticky top-0 z-10 flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <div class="min-w-0 flex-1">
              <h2 :id="titleId" class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {{ $t('projects.' + project.id + '.title') }}
              </h2>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <span
                  v-for="type in sortedTypes"
                  :key="type"
                  :class="[
                    'px-2.5 py-1 text-xs font-semibold rounded-full',
                    getTypeBadgeClasses(type)
                  ]"
                >
                  {{ $t('projects.types.' + type) }}
                </span>
              </div>
            </div>
            <button
              ref="closeBtnRef"
              type="button"
              class="shrink-0 min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-primary-500"
              :aria-label="$t('projects.page.closeModalAria')"
              @click="close"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>

          <!-- Body -->
          <div class="p-5 sm:p-6 space-y-6">
            <!-- Thumbnail (larger than card) -->
            <div
              v-if="project.thumbnailUrl"
              class="relative h-56 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
            >
              <img
                :src="project.thumbnailUrl"
                :alt="
                  $t('projects.page.thumbnailAlt', {
                    title: $t('projects.' + project.id + '.title')
                  })
                "
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <!-- Description -->
            <p :id="descId" class="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              {{ $t('projects.' + project.id + '.description') }}
            </p>

            <!-- Technologies (full list, no truncation) -->
            <section :aria-label="$t('projects.page.technologiesHeading')">
              <h3
                class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3"
              >
                {{ $t('projects.page.technologiesHeading') }}
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                >
                  {{ tech }}
                </span>
              </div>
            </section>

            <!-- Action Buttons -->
            <nav
              class="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-gray-100 dark:border-gray-700"
              :aria-label="$t('projects.page.linksAria')"
            >
              <a
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                :aria-label="
                  $t('projects.page.demoAria', { title: $t('projects.' + project.id + '.title') })
                "
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
                {{ $t('projects.page.demo') }}
              </a>
              <a
                v-if="project.docsUrl"
                :href="project.docsUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                :aria-label="
                  $t('projects.page.docsAria', { title: $t('projects.' + project.id + '.title') })
                "
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                {{ $t('projects.page.docs') }}
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                :aria-label="
                  $t('projects.page.githubAria', { title: $t('projects.' + project.id + '.title') })
                "
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                  />
                </svg>
                {{ $t('projects.page.github') }}
              </a>
              <a
                v-if="project.youtubeUrl"
                :href="project.youtubeUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                :aria-label="
                  $t('projects.page.videoAria', { title: $t('projects.' + project.id + '.title') })
                "
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
                {{ $t('projects.page.video') }}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
