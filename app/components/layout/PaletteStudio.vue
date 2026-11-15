<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '~/stores/theme'
import { PALETTE_THEMES, getHueDescription } from '~/data/themes'
import type { ThemeMode } from '~/types/theme'

const themeStore = useThemeStore()

const isOpen = ref(false)
const popoverRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLButtonElement | null>(null)
const themeRadioRefs = ref<HTMLElement[]>([])

function togglePopover() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      // Focus currently selected theme or first theme
      const activeIdx = PALETTE_THEMES.findIndex((t) => t.id === themeStore.currentThemeId)
      const target = themeRadioRefs.value[activeIdx >= 0 ? activeIdx : 0]
      target?.focus()
    })
  }
}

function closePopover() {
  isOpen.value = false
  triggerRef.value?.focus()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    closePopover()
  }
}

function handleClickOutside(event: MouseEvent) {
  if (!isOpen.value) return
  const target = event.target as Node
  if (
    popoverRef.value &&
    !popoverRef.value.contains(target) &&
    triggerRef.value &&
    !triggerRef.value.contains(target)
  ) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousedown', handleClickOutside)
})

function selectTheme(themeId: string) {
  themeStore.setPaletteTheme(themeId)
}

function handleThemeKeydown(event: KeyboardEvent, index: number) {
  let nextIndex = -1
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    nextIndex = (index + 1) % PALETTE_THEMES.length
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    nextIndex = (index - 1 + PALETTE_THEMES.length) % PALETTE_THEMES.length
  } else if (event.key === 'Home') {
    nextIndex = 0
  } else if (event.key === 'End') {
    nextIndex = PALETTE_THEMES.length - 1
  }

  if (nextIndex >= 0) {
    event.preventDefault()
    const nextTheme = PALETTE_THEMES[nextIndex]
    selectTheme(nextTheme.id)
    themeRadioRefs.value[nextIndex]?.focus()
  }
}

function handleHueInput(event: Event) {
  const target = event.target as HTMLInputElement
  themeStore.setCustomHue(Number(target.value))
}

const currentHueLabel = computed(() => getHueDescription(themeStore.activeHue))

const modeOptions: { id: ThemeMode; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'system', label: 'System' },
  { id: 'dark', label: 'Dark' }
]
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      type="button"
      class="relative min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 flex items-center justify-center gap-1.5"
      :aria-label="'Palette Studio: ' + themeStore.currentTheme.name"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="togglePopover"
    >
      <!-- Artist palette icon -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
      <!-- Live active theme indicator dot -->
      <span
        class="w-2.5 h-2.5 rounded-full ring-1 ring-white/50 dark:ring-black/50"
        :style="{ backgroundColor: themeStore.currentTheme.sampleColor }"
        aria-hidden="true"
      />
    </button>

    <!-- Palette Studio Popover Dialog -->
    <div
      v-if="isOpen"
      ref="popoverRef"
      role="dialog"
      aria-label="Palette Studio"
      class="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 z-50 text-gray-900 dark:text-gray-100 transition-all duration-200"
    >
      <!-- Popover Header -->
      <div
        class="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800"
      >
        <div>
          <h2 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>Palette Studio</span>
            <span
              class="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-medium"
            >
              OKLCH
            </span>
          </h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Named themes & dynamic hue dial
          </p>
        </div>
        <button
          type="button"
          class="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Close Palette Studio"
          @click="closePopover"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Section 1: Appearance Mode -->
      <div class="py-3 border-b border-gray-200 dark:border-gray-800">
        <label
          class="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2"
        >
          Appearance
        </label>
        <div
          class="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg"
          role="radiogroup"
          aria-label="Appearance mode"
        >
          <button
            v-for="mode in modeOptions"
            :key="mode.id"
            type="button"
            role="radio"
            :aria-checked="themeStore.theme === mode.id"
            class="px-2.5 py-1.5 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="[
              themeStore.theme === mode.id
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            ]"
            @click="themeStore.setTheme(mode.id)"
          >
            {{ mode.label }}
          </button>
        </div>
      </div>

      <!-- Section 2: Named Themes Grid -->
      <div class="py-3 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between mb-2">
          <label
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            Named Themes
          </label>
          <span class="text-xs text-primary-600 dark:text-primary-400 font-medium">
            {{ themeStore.currentTheme.name }}
          </span>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 gap-1.5"
          role="radiogroup"
          aria-label="Preset color themes"
        >
          <button
            v-for="(theme, idx) in PALETTE_THEMES"
            :key="theme.id"
            ref="themeRadioRefs"
            type="button"
            role="radio"
            :aria-checked="themeStore.currentThemeId === theme.id && themeStore.customHue === null"
            :tabindex="themeStore.currentThemeId === theme.id ? 0 : -1"
            class="px-2.5 py-2 rounded-lg text-left text-xs font-medium border transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="[
              themeStore.currentThemeId === theme.id && themeStore.customHue === null
                ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/30 text-gray-900 dark:text-white ring-1 ring-primary-500'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
            ]"
            @click="selectTheme(theme.id)"
            @keydown="handleThemeKeydown($event, idx)"
          >
            <span
              class="w-3.5 h-3.5 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/20"
              :style="{ backgroundColor: theme.sampleColor }"
              aria-hidden="true"
            />
            <span class="truncate">{{ theme.name }}</span>
          </button>
        </div>
      </div>

      <!-- Section 3: Live Hue Dial Slider -->
      <div class="py-3 border-b border-gray-200 dark:border-gray-800">
        <div class="flex items-center justify-between mb-1.5">
          <label
            for="hue-dial-input"
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            Live Hue Dial
          </label>
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-mono font-medium text-primary-600 dark:text-primary-400">
              {{ Math.round(themeStore.activeHue) }}°
            </span>
            <button
              v-if="themeStore.customHue !== null"
              type="button"
              class="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
              @click="themeStore.resetCustomHue"
            >
              Reset
            </button>
          </div>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">
          {{ currentHueLabel }}
        </p>
        <div class="relative py-1">
          <input
            id="hue-dial-input"
            type="range"
            min="0"
            max="360"
            step="1"
            :value="themeStore.activeHue"
            :aria-valuetext="currentHueLabel"
            aria-label="Color spectrum hue dial (0 to 360 degrees)"
            class="hue-slider w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            @input="handleHueInput"
          />
        </div>
      </div>

      <!-- Section 4: Live Swatches & Accessibility Guarantee -->
      <div class="pt-3">
        <div
          class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2"
        >
          <span>Active ramp</span>
          <span
            class="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium"
          >
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            WCAG AA 4.5:1+ guaranteed
          </span>
        </div>
        <!-- 5-step preview swatches -->
        <div
          class="grid grid-cols-5 gap-1 h-6 rounded-md overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800"
          aria-hidden="true"
        >
          <div class="bg-primary-100" title="primary-100" />
          <div class="bg-primary-300" title="primary-300" />
          <div class="bg-primary-500" title="primary-500" />
          <div class="bg-primary-700" title="primary-700" />
          <div class="bg-primary-900" title="primary-900" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Rainbow spectrum track for hue dial slider */
.hue-slider {
  background: linear-gradient(
    to right,
    oklch(0.65 0.16 0),
    oklch(0.65 0.16 60),
    oklch(0.65 0.16 120),
    oklch(0.65 0.16 180),
    oklch(0.65 0.16 240),
    oklch(0.65 0.16 300),
    oklch(0.65 0.16 360)
  );
}

.hue-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid #1f2937;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 100ms;
}

.hue-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

.hue-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  border: 2px solid #1f2937;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>
