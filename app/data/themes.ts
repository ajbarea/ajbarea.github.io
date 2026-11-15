import type { PaletteTheme } from '~/types/theme'

export const DEFAULT_LIGHT_THEME_ID = 'ember'
export const DEFAULT_DARK_THEME_ID = 'forest'
export const DEFAULT_THEME_ID = 'ember'

export function getDefaultThemeId(isDark: boolean): string {
  return isDark ? DEFAULT_DARK_THEME_ID : DEFAULT_LIGHT_THEME_ID
}

export const PALETTE_THEMES: PaletteTheme[] = [
  {
    id: 'ember',
    name: 'Ember',
    hue: 38,
    chroma: 0.17,
    description: 'Warm amber & terracotta (Light Default)',
    sampleColor: '#ea580c'
  },
  {
    id: 'terracotta',
    name: 'Terracotta',
    hue: 24,
    chroma: 0.18,
    description: 'Earthy Tuscan clay & rust',
    sampleColor: '#c2410c'
  },
  {
    id: 'rose',
    name: 'Rose',
    hue: 12,
    chroma: 0.18,
    description: 'Crimson coral & wild rose',
    sampleColor: '#e11d48'
  },
  {
    id: 'plum',
    name: 'Plum',
    hue: 315,
    chroma: 0.18,
    description: 'Velvet royal violet & plum',
    sampleColor: '#9333ea'
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    hue: 285,
    chroma: 0.18,
    description: 'Crystalline amethyst purple',
    sampleColor: '#7c3aed'
  },
  {
    id: 'iris',
    name: 'Iris',
    hue: 260,
    chroma: 0.17,
    description: 'Periwinkle & vibrant iris',
    sampleColor: '#4f46e5'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    hue: 195,
    chroma: 0.16,
    description: 'Deep cyan & marine teal',
    sampleColor: '#0284c7'
  },
  {
    id: 'forest',
    name: 'Forest',
    hue: 145,
    chroma: 0.16,
    description: 'Pine & lush emerald green (Dark Default)',
    sampleColor: '#059669'
  },
  {
    id: 'olive',
    name: 'Olive',
    hue: 110,
    chroma: 0.15,
    description: 'Warm moss & golden olive',
    sampleColor: '#65a30d'
  },
  {
    id: 'sand',
    name: 'Sand',
    hue: 70,
    chroma: 0.16,
    description: 'Warm desert sand & ochre',
    sampleColor: '#d97706'
  },
  {
    id: 'ink',
    name: 'Ink',
    hue: 240,
    chroma: 0.03,
    description: 'Minimalist graphite & slate',
    sampleColor: '#475569'
  }
]

export function getThemeById(id: string): PaletteTheme {
  return PALETTE_THEMES.find((t) => t.id === id) || PALETTE_THEMES[0]
}

/**
 * Finds the nearest named theme to a given hue angle (0 - 360).
 * Handles circular distance around the 0/360 boundary.
 */
export function getClosestTheme(hue: number): PaletteTheme {
  const normalizedHue = ((hue % 360) + 360) % 360
  let closest = PALETTE_THEMES[0]
  let minDiff = 360

  for (const theme of PALETTE_THEMES) {
    if (theme.id === 'ink') continue // Ink is low-chroma neutral, not primarily a hue stop
    const diff = Math.min(
      Math.abs(normalizedHue - theme.hue),
      360 - Math.abs(normalizedHue - theme.hue)
    )
    if (diff < minDiff) {
      minDiff = diff
      closest = theme
    }
  }

  return closest
}

export function getHueDescription(hue: number): string {
  const closest = getClosestTheme(hue)
  return `hue ${Math.round(hue)}°, ${closest.name}-like`
}
