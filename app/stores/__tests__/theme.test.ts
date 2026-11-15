import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useThemeStore } from '../theme'
import {
  DEFAULT_THEME_ID,
  DEFAULT_LIGHT_THEME_ID,
  DEFAULT_DARK_THEME_ID,
  PALETTE_THEMES
} from '~/data/themes'

describe('Theme & Palette Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('data-custom-hue')
    document.documentElement.className = ''
    document.documentElement.style.cssText = ''
  })

  it('initializes with Ember as the default theme (not developer blue)', () => {
    const store = useThemeStore()
    expect(DEFAULT_THEME_ID).toBe('ember')
    expect(store.currentThemeId).toBe('ember')
    expect(store.currentTheme.name).toBe('Ember')
    expect(store.customHue).toBeNull()
    expect(store.activeHue).toBe(38)
    expect(store.activeChroma).toBe(0.17)
  })

  it('selects a named theme, updates root attributes and saves to localStorage', () => {
    const store = useThemeStore()
    store.setPaletteTheme('forest')

    expect(store.currentThemeId).toBe('forest')
    expect(store.currentTheme.name).toBe('Forest')
    expect(store.customHue).toBeNull()
    expect(store.activeHue).toBe(145)
    expect(localStorage.getItem('palette-theme')).toBe('forest')
    expect(localStorage.getItem('palette-custom-hue')).toBeNull()

    expect(document.documentElement.getAttribute('data-theme')).toBe('forest')
    expect(document.documentElement.style.getPropertyValue('--primary-h')).toBe('145')
    expect(document.documentElement.style.getPropertyValue('--primary-c')).toBe('0.16')
  })

  it('sets a custom hue, updates live root tokens and persists value', () => {
    const store = useThemeStore()
    store.setCustomHue(210)

    expect(store.customHue).toBe(210)
    expect(store.activeHue).toBe(210)
    expect(localStorage.getItem('palette-custom-hue')).toBe('210')
    expect(document.documentElement.getAttribute('data-custom-hue')).toBe('210')
    expect(document.documentElement.style.getPropertyValue('--primary-h')).toBe('210')
  })

  it('resets custom hue back to the natural theme hue', () => {
    const store = useThemeStore()
    store.setPaletteTheme('terracotta') // Hue: 24
    store.setCustomHue(180)
    expect(store.activeHue).toBe(180)

    store.resetCustomHue()
    expect(store.customHue).toBeNull()
    expect(store.activeHue).toBe(24)
    expect(localStorage.getItem('palette-custom-hue')).toBeNull()
    expect(document.documentElement.hasAttribute('data-custom-hue')).toBe(false)
    expect(document.documentElement.style.getPropertyValue('--primary-h')).toBe('24')
  })

  it('restores saved palette theme and custom hue during initTheme()', () => {
    localStorage.setItem('theme', 'dark')
    localStorage.setItem('palette-theme', 'plum')
    localStorage.setItem('palette-custom-hue', '325')

    const store = useThemeStore()
    store.initTheme()

    expect(store.theme).toBe('dark')
    expect(store.currentThemeId).toBe('plum')
    expect(store.customHue).toBe(325)
    expect(store.activeHue).toBe(325)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.getAttribute('data-theme')).toBe('plum')
    expect(document.documentElement.style.getPropertyValue('--primary-h')).toBe('325')
  })

  it('handles invalid or corrupted localStorage values safely without throwing', () => {
    localStorage.setItem('palette-theme', 'non-existent-theme-xyz')
    localStorage.setItem('palette-custom-hue', 'not-a-number')

    const store = useThemeStore()
    expect(() => store.initTheme()).not.toThrow()
    expect(store.currentThemeId).toBe(DEFAULT_THEME_ID)
    expect(store.customHue).toBeNull()
    expect(store.activeHue).toBe(38)
  })

  it('provides all 11 curated named themes with distinctive hues', () => {
    expect(PALETTE_THEMES.length).toBe(11)
    const ids = PALETTE_THEMES.map((t) => t.id)
    expect(ids).toContain('ember')
    expect(ids).toContain('terracotta')
    expect(ids).toContain('rose')
    expect(ids).toContain('plum')
    expect(ids).toContain('amethyst')
    expect(ids).toContain('iris')
    expect(ids).toContain('ocean')
    expect(ids).toContain('forest')
    expect(ids).toContain('olive')
    expect(ids).toContain('sand')
    expect(ids).toContain('ink')
  })

  it('manages surfaceMode state, data-surface attribute and storage persistence', () => {
    const store = useThemeStore()
    expect(store.surfaceMode).toBe('palette')

    store.setSurfaceMode('oled')
    expect(store.surfaceMode).toBe('oled')
    expect(localStorage.getItem('palette-surface-mode')).toBe('oled')
    expect(document.documentElement.getAttribute('data-surface')).toBe('oled')

    store.setSurfaceMode('neutral')
    expect(store.surfaceMode).toBe('neutral')
    expect(localStorage.getItem('palette-surface-mode')).toBe('neutral')
    expect(document.documentElement.getAttribute('data-surface')).toBe('neutral')
  })

  it('restores saved surfaceMode during initTheme()', () => {
    localStorage.setItem('palette-surface-mode', 'oled')
    const store = useThemeStore()
    store.initTheme()

    expect(store.surfaceMode).toBe('oled')
    expect(document.documentElement.getAttribute('data-surface')).toBe('oled')
  })

  it('adapts to mode defaults: Ember for light ambiance and Forest for dark ambiance', () => {
    const store = useThemeStore()
    expect(DEFAULT_LIGHT_THEME_ID).toBe('ember')
    expect(DEFAULT_DARK_THEME_ID).toBe('forest')

    // In light mode by default
    expect(store.currentThemeId).toBe('ember')
    expect(store.activeHue).toBe(38)

    // Switch to dark mode without manual palette override
    store.setTheme('dark')
    expect(store.currentThemeId).toBe('forest')
    expect(store.activeHue).toBe(145)
    expect(document.documentElement.getAttribute('data-theme')).toBe('forest')
    expect(document.documentElement.style.getPropertyValue('--primary-h')).toBe('145')

    // Switch back to light mode
    store.setTheme('light')
    expect(store.currentThemeId).toBe('ember')
    expect(store.activeHue).toBe(38)
    expect(document.documentElement.getAttribute('data-theme')).toBe('ember')
    expect(document.documentElement.style.getPropertyValue('--primary-h')).toBe('38')
  })

  it('preserves an explicitly chosen theme across light and dark ambiance changes', () => {
    const store = useThemeStore()
    store.setPaletteTheme('ocean')
    expect(store.currentThemeId).toBe('ocean')

    // Switch to dark mode: explicit choice stays locked
    store.setTheme('dark')
    expect(store.currentThemeId).toBe('ocean')
    expect(store.activeHue).toBe(195)
    expect(document.documentElement.getAttribute('data-theme')).toBe('ocean')

    // Switch to light mode: stays locked
    store.setTheme('light')
    expect(store.currentThemeId).toBe('ocean')
    expect(store.activeHue).toBe(195)
  })

  it('resets to curated mode defaults via resetToDefaults()', () => {
    const store = useThemeStore()
    store.setPaletteTheme('plum')
    store.setCustomHue(320)
    store.setSurfaceMode('oled')
    store.setTheme('dark')

    expect(store.currentThemeId).toBe('plum')
    expect(store.customHue).toBe(320)
    expect(store.surfaceMode).toBe('oled')

    store.resetToDefaults()

    // Since we are in dark mode, reset restores Forest
    expect(store.currentThemeId).toBe('forest')
    expect(store.customHue).toBeNull()
    expect(store.surfaceMode).toBe('palette')
    expect(localStorage.getItem('palette-theme')).toBeNull()
    expect(localStorage.getItem('palette-custom-hue')).toBeNull()
    expect(localStorage.getItem('palette-surface-mode')).toBeNull()

    // Switching to light restores Ember
    store.setTheme('light')
    expect(store.currentThemeId).toBe('ember')
  })
})
