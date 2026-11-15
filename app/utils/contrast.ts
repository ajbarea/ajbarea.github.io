/**
 * Color math and WCAG 2.1 relative luminance / contrast calculation utilities
 * for OKLCH perceptual color space and accessible palette verification.
 */

export interface RgbColor {
  r: number // 0 - 1
  g: number // 0 - 1
  b: number // 0 - 1
}

/**
 * Converts OKLCH (L: 0-1, C: >=0, H: 0-360) to linear sRGB, then clamped sRGB (0-1).
 * Uses standard Björn Ottosson OKLCH matrix transformations.
 */
export function oklchToRgb(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const L = l_ * l_ * l_
  const M = m_ * m_ * m_
  const S = s_ * s_ * s_

  const r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S
  const g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S
  const b_ = -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S

  const toSrgb = (x: number) => {
    const clamped = Math.max(0, Math.min(1, x))
    return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055
  }

  return [toSrgb(r), toSrgb(g), toSrgb(b_)]
}

/**
 * Computes WCAG 2.1 relative luminance for an [r, g, b] color (0-1).
 */
export function relativeLuminance([r, g, b]: [number, number, number]): number {
  const gamma = [r, g, b].map((v) =>
    v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  )
  return 0.2126 * gamma[0] + 0.7152 * gamma[1] + 0.0722 * gamma[2]
}

/**
 * Calculates WCAG 2.1 contrast ratio between two [r, g, b] colors.
 * Returns a ratio >= 1.0 (e.g. 4.5 for 4.5:1).
 */
export function contrastRatio(
  color1: [number, number, number],
  color2: [number, number, number]
): number {
  const l1 = relativeLuminance(color1)
  const l2 = relativeLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export const WHITE_RGB: [number, number, number] = [1, 1, 1]
export const DARK_BG_RGB: [number, number, number] = [0x11 / 255, 0x18 / 255, 0x27 / 255] // #111827
export const DARK_SURFACE_RGB: [number, number, number] = [0x37 / 255, 0x41 / 255, 0x51 / 255] // #374151 (gray-700)

/**
 * Verifies that a given hue and chroma satisfy WCAG AA contrast:
 * - Light mode: primary-600 against white (>= 4.5:1 for body text)
 * - Dark mode: primary-400 against dark background #111827 (>= 4.5:1 for body text)
 */
export function evaluatePaletteContrast(
  hue: number,
  chroma: number,
  overrides?: { lightL?: number; darkL?: number }
) {
  const lightL = overrides?.lightL ?? 0.48
  const darkL = overrides?.darkL ?? 0.76

  const primary600 = oklchToRgb(lightL, chroma, hue)
  const primary400 = oklchToRgb(darkL, chroma * 0.88, hue)

  const lightContrast = contrastRatio(primary600, WHITE_RGB)
  const darkContrast = contrastRatio(primary400, DARK_BG_RGB)
  const darkSurfaceContrast = contrastRatio(primary400, DARK_SURFACE_RGB)

  return {
    lightContrast,
    darkContrast,
    darkSurfaceContrast,
    lightPassesBody: lightContrast >= 4.5,
    lightPassesLarge: lightContrast >= 3.0,
    darkPassesBody: darkContrast >= 4.5,
    darkPassesLarge: darkContrast >= 3.0
  }
}
