export type ThemeMode = 'light' | 'dark' | 'system'
export type SurfaceMode = 'palette' | 'oled' | 'neutral'

export interface PaletteTheme {
  id: string
  name: string
  hue: number // 0 - 360 degrees
  chroma: number // target chroma (typically 0.03 to 0.18)
  description: string
  sampleColor: string
}

export interface PalettePreferences {
  mode: ThemeMode
  surfaceMode: SurfaceMode
  themeId: string
  customHue: number | null
}
