<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useThemeStore } from '~/stores/theme'
import {
  PALETTE_THEMES,
  DEFAULT_LIGHT_THEME_ID,
  DEFAULT_DARK_THEME_ID,
  getHueDescription
} from '~/data/themes'
import type { ThemeMode, SurfaceMode } from '~/types/theme'

const { t } = useI18n()
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

function stepHue(delta: number) {
  const current = themeStore.activeHue
  let next = (current + delta) % 360
  if (next < 0) next += 360
  themeStore.setCustomHue(Math.round(next))
}

const currentHueLabel = computed(() => getHueDescription(themeStore.activeHue))

const ambianceOptions = computed<{ id: ThemeMode; label: string; icon: string }[]>(() => [
  {
    id: 'light',
    label: t('palette.modes.light'),
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    id: 'system',
    label: t('palette.modes.system'),
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
  },
  {
    id: 'dark',
    label: t('palette.modes.dark'),
    icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
  }
])

const surfaceOptions = computed<{ id: SurfaceMode; label: string; badge: string }[]>(() => [
  {
    id: 'palette',
    label: t('palette.surfaces.palette'),
    badge: t('palette.surfaces.paletteBadge')
  },
  {
    id: 'oled',
    label: t('palette.surfaces.oled'),
    badge: t('palette.surfaces.oledBadge')
  },
  {
    id: 'neutral',
    label: t('palette.surfaces.neutral'),
    badge: t('palette.surfaces.neutralBadge')
  }
])
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger Button -->
    <button
      ref="triggerRef"
      type="button"
      class="relative min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 flex items-center justify-center gap-1.5"
      :aria-label="t('palette.triggerAria', { theme: themeStore.currentTheme.name })"
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
      :aria-label="t('palette.title')"
      class="absolute right-0 mt-2 w-84 sm:w-96 max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto bg-surface-card rounded-2xl shadow-2xl border border-surface-border p-4 sm:p-5 z-50 text-gray-900 dark:text-gray-100 transition-all duration-200"
    >
      <!-- Popover Header -->
      <div class="flex items-center justify-between pb-3 border-b border-surface-border">
        <div>
          <h2 class="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>{{ t('palette.title') }}</span>
            <span
              class="text-xs px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-medium"
            >
              OKLCH
            </span>
          </h2>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {{ t('palette.subtitle') }}
          </p>
        </div>
        <button
          type="button"
          class="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          :aria-label="t('palette.closeAria')"
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

      <!-- Section 1: Ambiance Mode (Light / System / Dark) -->
      <div class="py-3 border-b border-surface-border">
        <label
          class="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2"
        >
          {{ t('palette.ambiance') }}
        </label>
        <div
          class="grid grid-cols-3 gap-1 bg-gray-100 dark:bg-gray-800/60 p-1 rounded-xl"
          role="radiogroup"
          :aria-label="t('palette.ambiance')"
        >
          <button
            v-for="mode in ambianceOptions"
            :key="mode.id"
            type="button"
            role="radio"
            :aria-checked="themeStore.theme === mode.id"
            class="px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="[
              themeStore.theme === mode.id
                ? 'bg-surface-card text-gray-900 dark:text-white shadow-sm font-semibold ring-1 ring-primary-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            ]"
            @click="themeStore.setTheme(mode.id)"
          >
            <svg
              class="w-3.5 h-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="mode.icon"
              />
            </svg>
            {{ mode.label }}
          </button>
        </div>
      </div>

      <!-- Section 2: Surface Tone (Palette Canvas / OLED / Neutral) -->
      <div class="py-3 border-b border-surface-border">
        <label
          class="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2"
        >
          {{ t('palette.surface') }}
        </label>
        <div
          class="grid grid-cols-3 gap-1.5"
          role="radiogroup"
          :aria-label="t('palette.surfaceAria')"
        >
          <button
            v-for="surf in surfaceOptions"
            :key="surf.id"
            type="button"
            role="radio"
            :aria-checked="themeStore.surfaceMode === surf.id"
            class="px-2 py-2 rounded-lg text-left text-xs border transition-all flex flex-col justify-between gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="[
              themeStore.surfaceMode === surf.id
                ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/30 text-gray-900 dark:text-white ring-1 ring-primary-500 font-medium'
                : 'border-surface-border hover:bg-gray-50 dark:hover:bg-gray-800/40 text-gray-700 dark:text-gray-300'
            ]"
            @click="themeStore.setSurfaceMode(surf.id)"
          >
            <span class="font-semibold truncate">{{ surf.label }}</span>
            <span class="text-[10px] text-gray-500 dark:text-gray-400 truncate">{{
              surf.badge
            }}</span>
          </button>
        </div>
      </div>

      <!-- Section 3: Named Themes Grid -->
      <div class="py-3 border-b border-surface-border">
        <div class="flex items-center justify-between mb-2">
          <label
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            {{ t('palette.namedThemes') }}
          </label>
          <span class="text-xs text-primary-600 dark:text-primary-400 font-medium">
            {{ themeStore.currentTheme.name }}
          </span>
        </div>
        <div
          class="grid grid-cols-2 sm:grid-cols-3 gap-1.5"
          role="radiogroup"
          :aria-label="t('palette.presetThemesAria')"
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
                : 'border-surface-border hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
            ]"
            @click="selectTheme(theme.id)"
            @keydown="handleThemeKeydown($event, idx)"
          >
            <span
              class="w-3.5 h-3.5 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/20"
              :style="{ backgroundColor: theme.sampleColor }"
              aria-hidden="true"
            />
            <span class="truncate flex-1">{{ theme.name }}</span>
            <span
              v-if="theme.id === DEFAULT_LIGHT_THEME_ID"
              class="text-[9px] font-semibold uppercase px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shrink-0"
              :title="t('palette.titleDefaultLight')"
            >
              {{ t('palette.badgeLight') }}
            </span>
            <span
              v-else-if="theme.id === DEFAULT_DARK_THEME_ID"
              class="text-[9px] font-semibold uppercase px-1 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 shrink-0"
              :title="t('palette.titleDefaultDark')"
            >
              {{ t('palette.badgeDark') }}
            </span>
          </button>
        </div>
      </div>

      <!-- Section 4: Live Hue Dial Slider with Steppers -->
      <div class="py-3 border-b border-surface-border">
        <div class="flex items-center justify-between mb-1.5">
          <label
            for="hue-dial-input"
            class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            {{ t('palette.liveHueDial') }}
          </label>
          <div class="flex items-center gap-1.5">
            <span class="text-xs font-mono font-medium text-primary-600 dark:text-primary-400">
              {{ Math.round(themeStore.activeHue) }}°
            </span>
            <button
              v-if="themeStore.customHue !== null"
              type="button"
              class="text-[11px] text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
              @click="themeStore.resetCustomHue"
            >
              {{ t('palette.resetHue') }}
            </button>
          </div>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-2">
          {{ currentHueLabel }}
        </p>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-2 py-1 text-xs rounded-md border border-surface-border hover:bg-gray-100 dark:hover:bg-gray-800 font-mono text-gray-600 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :title="t('palette.stepDownAria')"
            :aria-label="t('palette.stepDownAria')"
            @click="stepHue(-5)"
          >
            -5°
          </button>
          <div class="relative py-1 flex-1">
            <input
              id="hue-dial-input"
              type="range"
              min="0"
              max="360"
              step="1"
              :value="themeStore.activeHue"
              :aria-valuetext="currentHueLabel"
              :aria-label="t('palette.liveHueDial')"
              class="hue-slider w-full h-2 rounded-lg appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              @input="handleHueInput"
            />
          </div>
          <button
            type="button"
            class="px-2 py-1 text-xs rounded-md border border-surface-border hover:bg-gray-100 dark:hover:bg-gray-800 font-mono text-gray-600 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :title="t('palette.stepUpAria')"
            :aria-label="t('palette.stepUpAria')"
            @click="stepHue(5)"
          >
            +5°
          </button>
        </div>
      </div>

      <!-- Section 5: Interactive Ramp Swatches (Click 50 for Light, 950 for Dark) -->
      <div class="py-3 border-b border-surface-border">
        <div
          class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2"
        >
          <span>{{ t('palette.swatchesLabel') }}</span>
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
            WCAG AA 4.5:1+
          </span>
        </div>
        <!-- 5-step interactive preview swatches -->
        <div
          class="grid grid-cols-5 gap-1.5 h-10 rounded-lg p-1 bg-gray-100 dark:bg-gray-800/50 border border-surface-border"
          role="group"
          :aria-label="t('palette.swatchesLabel')"
        >
          <!-- Swatch 1: primary-50 (Light canvas) -->
          <button
            type="button"
            class="relative rounded h-full bg-primary-50 border transition-all flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="[
              themeStore.theme === 'light'
                ? 'border-primary-600 ring-2 ring-primary-500 shadow-sm'
                : 'border-transparent hover:scale-105'
            ]"
            :title="t('palette.swatch50')"
            :aria-label="t('palette.swatch50')"
            @click="themeStore.setTheme('light')"
          >
            <span class="text-[9px] font-mono font-bold text-gray-800">50</span>
          </button>

          <!-- Swatch 2: primary-200 -->
          <div
            class="rounded h-full bg-primary-200 flex items-center justify-center text-[9px] font-mono font-bold text-gray-800 select-none"
            title="primary-200"
            aria-hidden="true"
          >
            200
          </div>

          <!-- Swatch 3: primary-500 -->
          <div
            class="rounded h-full bg-primary-500 flex items-center justify-center text-[9px] font-mono font-bold text-white select-none"
            title="primary-500"
            aria-hidden="true"
          >
            500
          </div>

          <!-- Swatch 4: primary-800 -->
          <div
            class="rounded h-full bg-primary-800 flex items-center justify-center text-[9px] font-mono font-bold text-white select-none"
            title="primary-800"
            aria-hidden="true"
          >
            800
          </div>

          <!-- Swatch 5: primary-950 (Dark canvas) -->
          <button
            type="button"
            class="relative rounded h-full bg-primary-950 border transition-all flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            :class="[
              themeStore.theme === 'dark'
                ? 'border-primary-400 ring-2 ring-primary-400 shadow-sm'
                : 'border-transparent hover:scale-105'
            ]"
            :title="t('palette.swatch950')"
            :aria-label="t('palette.swatch950')"
            @click="themeStore.setTheme('dark')"
          >
            <span class="text-[9px] font-mono font-bold text-white">950</span>
          </button>
        </div>
      </div>

      <!-- Section 6: Live Atmosphere Preview Card -->
      <div class="pt-3">
        <label
          class="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2"
        >
          {{ t('palette.previewLabel') }}
        </label>
        <div
          class="p-3.5 rounded-xl border border-surface-border bg-canvas transition-colors duration-200"
        >
          <div
            class="p-3 rounded-lg bg-surface-card border border-surface-border shadow-sm flex items-center justify-between gap-3"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <span class="text-theme-icon shrink-0">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </span>
              <div class="min-w-0">
                <p class="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {{ t('palette.previewTitle') }}
                </p>
                <p class="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {{ t('palette.previewSubtitle') }}
                </p>
              </div>
            </div>
            <button
              type="button"
              class="px-2.5 py-1 text-xs font-medium rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors shrink-0"
            >
              {{ t('palette.previewAction') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Section 7: Curated Defaults Bar -->
      <div class="pt-3 border-t border-surface-border flex items-center justify-between gap-2">
        <div class="text-[11px] text-gray-500 dark:text-gray-400">
          <span class="font-medium">{{ t('palette.curatedDefaults') }}</span>
          {{ t('palette.defaultsSummary') }}
        </div>
        <button
          type="button"
          class="px-2 py-1 text-xs font-medium rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 shrink-0"
          @click="themeStore.resetToDefaults()"
        >
          {{ t('palette.resetDefaults') }}
        </button>
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
