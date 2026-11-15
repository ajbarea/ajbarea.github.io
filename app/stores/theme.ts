import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Theme } from '~/types'
import { DEFAULT_THEME_ID, PALETTE_THEMES, getThemeById } from '~/data/themes'

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key)
    }
  } catch {
    // Storage access denied or unavailable
  }
  return null
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value)
    }
  } catch {
    // Storage access denied or unavailable
  }
}

function safeRemoveItem(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key)
    }
  } catch {
    // Storage access denied or unavailable
  }
}

export const useThemeStore = defineStore('theme', () => {
  // Light/Dark mode state
  const theme = ref<Theme>('system')
  const resolvedTheme = ref<'light' | 'dark'>('light')
  const isDark = computed(() => resolvedTheme.value === 'dark')

  // Palette Studio state
  const currentThemeId = ref<string>(DEFAULT_THEME_ID)
  const customHue = ref<number | null>(null)

  const currentTheme = computed(() => getThemeById(currentThemeId.value))
  const activeHue = computed(() =>
    customHue.value !== null ? customHue.value : currentTheme.value.hue
  )
  const activeChroma = computed(() => currentTheme.value.chroma)

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    safeSetItem('theme', newTheme)
    applyTheme()
  }

  function setPaletteTheme(themeId: string) {
    const found = PALETTE_THEMES.find((t) => t.id === themeId)
    if (found) {
      currentThemeId.value = found.id
      customHue.value = null
      safeSetItem('palette-theme', found.id)
      safeRemoveItem('palette-custom-hue')
      applyPalette()
    }
  }

  function setCustomHue(hue: number | null) {
    if (hue === null) {
      resetCustomHue()
      return
    }
    const normalized = Math.round(((hue % 360) + 360) % 360)
    customHue.value = normalized
    safeSetItem('palette-custom-hue', String(normalized))
    applyPalette()
  }

  function resetCustomHue() {
    customHue.value = null
    safeRemoveItem('palette-custom-hue')
    applyPalette()
  }

  function applyTheme() {
    if (typeof window === 'undefined') return

    const systemDark =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches

    const isDarkMode = theme.value === 'dark' || (theme.value === 'system' && systemDark)

    resolvedTheme.value = isDarkMode ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', isDarkMode)
  }

  function applyPalette() {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    root.style.setProperty('--primary-h', String(activeHue.value))
    root.style.setProperty('--primary-c', String(activeChroma.value))
    root.setAttribute('data-theme', currentThemeId.value)
    if (customHue.value !== null) {
      root.setAttribute('data-custom-hue', String(customHue.value))
    } else {
      root.removeAttribute('data-custom-hue')
    }
  }

  function initTheme() {
    if (typeof window === 'undefined') return

    // 1. Restore Light/Dark mode
    const savedMode = safeGetItem('theme') as Theme | null
    theme.value = savedMode || 'system'
    applyTheme()

    // 2. Restore Palette Theme & Custom Hue
    const savedTheme = safeGetItem('palette-theme')
    if (savedTheme && PALETTE_THEMES.some((t) => t.id === savedTheme)) {
      currentThemeId.value = savedTheme
    } else {
      currentThemeId.value = DEFAULT_THEME_ID
    }

    const savedHue = safeGetItem('palette-custom-hue')
    if (savedHue !== null && !isNaN(Number(savedHue))) {
      customHue.value = Math.round(Number(savedHue))
    } else {
      customHue.value = null
    }

    applyPalette()

    // 3. Listen for system appearance preference changes
    if (typeof window.matchMedia === 'function') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (theme.value === 'system') applyTheme()
      })
    }
  }

  return {
    // Mode state & actions
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    // Palette state & actions
    currentThemeId,
    currentTheme,
    customHue,
    activeHue,
    activeChroma,
    setPaletteTheme,
    setCustomHue,
    resetCustomHue,
    applyTheme,
    applyPalette,
    initTheme
  }
})
