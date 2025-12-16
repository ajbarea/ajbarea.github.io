import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Theme } from '~/types'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>('system')
  const resolvedTheme = ref<'light' | 'dark'>('light')

  const isDark = computed(() => resolvedTheme.value === 'dark')

  function setTheme(newTheme: Theme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    applyTheme()
  }

  function applyTheme() {
    const isDarkMode =
      theme.value === 'dark' ||
      (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    resolvedTheme.value = isDarkMode ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', isDarkMode)
  }

  function initTheme() {
    const saved = localStorage.getItem('theme') as Theme | null
    theme.value = saved || 'system'
    applyTheme()

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') applyTheme()
    })
  }

  return { theme, resolvedTheme, isDark, setTheme, initTheme }
})
