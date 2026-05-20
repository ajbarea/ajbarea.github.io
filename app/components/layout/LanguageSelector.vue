<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

type LocaleEntry = { code: string; name: string }

const { locale, locales, setLocale } = useI18n()
const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)

const localeList = computed(() => locales.value as LocaleEntry[])

const currentLabel = computed(
  () => localeList.value.find((l) => l.code === locale.value)?.name ?? locale.value
)

function toggleOpen() {
  isOpen.value = !isOpen.value
}

function selectLocale(code: string) {
  if (code !== locale.value) setLocale(code)
  isOpen.value = false
}

function onDocumentClick(e: MouseEvent) {
  if (!rootEl.value) return
  if (!rootEl.value.contains(e.target as Node)) isOpen.value = false
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <div ref="rootEl" class="relative">
    <button
      type="button"
      class="min-w-[44px] min-h-[44px] px-2.5 py-2 rounded-lg flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-label="$t('lang.select')"
      @click.stop="toggleOpen"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18"
        />
      </svg>
      <span class="hidden sm:inline">{{ currentLabel }}</span>
    </button>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-if="isOpen"
        class="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black/5 py-1 z-50"
        role="listbox"
        :aria-label="$t('lang.select')"
      >
        <li v-for="l in localeList" :key="l.code">
          <button
            type="button"
            role="option"
            :aria-selected="l.code === locale"
            class="block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="
              l.code === locale
                ? 'text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                : 'text-gray-700 dark:text-gray-300'
            "
            :lang="l.code"
            @click="selectLocale(l.code)"
          >
            {{ l.name }}
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
