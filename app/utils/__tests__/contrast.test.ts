import { describe, it, expect } from 'vitest'
import {
  oklchToRgb,
  contrastRatio,
  evaluatePaletteContrast,
  evaluateCanvasContrast,
  WHITE_RGB
} from '../contrast'
import { PALETTE_THEMES } from '~/data/themes'

describe('Palette Studio Contrast Gate & WCAG 2.1 Compliance', () => {
  it('guarantees WCAG AA (>= 4.5:1) for all 11 named themes in light mode', () => {
    for (const theme of PALETTE_THEMES) {
      const evaluation = evaluatePaletteContrast(theme.hue, theme.chroma)
      expect(
        evaluation.lightPassesBody,
        `Theme ${theme.name} (hue: ${theme.hue}, chroma: ${theme.chroma}) failed light mode body contrast: ${evaluation.lightContrast.toFixed(2)}:1`
      ).toBe(true)
      expect(evaluation.lightContrast).toBeGreaterThanOrEqual(4.5)
      expect(evaluation.lightPassesLarge).toBe(true)
    }
  })

  it('guarantees WCAG AA (>= 4.5:1) for all 11 named themes in dark mode', () => {
    for (const theme of PALETTE_THEMES) {
      const evaluation = evaluatePaletteContrast(theme.hue, theme.chroma)
      expect(
        evaluation.darkPassesBody,
        `Theme ${theme.name} (hue: ${theme.hue}, chroma: ${theme.chroma}) failed dark mode body contrast: ${evaluation.darkContrast.toFixed(2)}:1`
      ).toBe(true)
      expect(evaluation.darkContrast).toBeGreaterThanOrEqual(4.5)
      expect(evaluation.darkPassesLarge).toBe(true)
    }
  })

  it('guarantees WCAG AA (>= 4.5:1) across every degree of the live hue dial (0 to 359 degrees)', () => {
    const defaultChroma = 0.16
    let minLight = 999
    let minDark = 999

    for (let hue = 0; hue < 360; hue++) {
      const evaluation = evaluatePaletteContrast(hue, defaultChroma)
      if (evaluation.lightContrast < minLight) minLight = evaluation.lightContrast
      if (evaluation.darkContrast < minDark) minDark = evaluation.darkContrast

      expect(
        evaluation.lightPassesBody,
        `Hue ${hue}° failed light mode body contrast (${evaluation.lightContrast.toFixed(2)}:1)`
      ).toBe(true)
      expect(
        evaluation.darkPassesBody,
        `Hue ${hue}° failed dark mode body contrast (${evaluation.darkContrast.toFixed(2)}:1)`
      ).toBe(true)
    }

    // Assert that the minimum contrast across the whole spectrum stays well above 4.5
    expect(minLight).toBeGreaterThanOrEqual(4.5)
    expect(minDark).toBeGreaterThanOrEqual(4.5)
  })

  it('mutation check: pulling lightness toward the background causes contrast verification to fail', () => {
    // Light mode mutation: pull primary-600 lightness up from 0.48 to 0.78 (closer to white background)
    const mutatedLight = evaluatePaletteContrast(38, 0.17, { lightL: 0.78 })
    expect(mutatedLight.lightContrast).toBeLessThan(4.5)
    expect(mutatedLight.lightPassesBody).toBe(false)

    // Dark mode mutation: pull primary-400 lightness down from 0.74 to 0.32 (closer to #111827 background)
    const mutatedDark = evaluatePaletteContrast(38, 0.17, { darkL: 0.32 })
    expect(mutatedDark.darkContrast).toBeLessThan(4.5)
    expect(mutatedDark.darkPassesBody).toBe(false)
  })

  it('computes expected sRGB bounds and relative luminance correctly', () => {
    const whiteRgb = oklchToRgb(1.0, 0, 0)
    expect(whiteRgb[0]).toBeCloseTo(1, 2)
    expect(whiteRgb[1]).toBeCloseTo(1, 2)
    expect(whiteRgb[2]).toBeCloseTo(1, 2)

    const blackRgb = oklchToRgb(0, 0, 0)
    expect(blackRgb[0]).toBeCloseTo(0, 2)
    expect(blackRgb[1]).toBeCloseTo(0, 2)
    expect(blackRgb[2]).toBeCloseTo(0, 2)

    const maxContrast = contrastRatio(WHITE_RGB, [0, 0, 0])
    expect(maxContrast).toBeCloseTo(21, 0) // Max WCAG contrast is 21:1
  })

  it('guarantees WCAG AA canvas and resting icon contrast for all 11 named themes', () => {
    for (const theme of PALETTE_THEMES) {
      const evaluation = evaluateCanvasContrast(theme.hue, theme.chroma)
      expect(
        evaluation.lightCanvasPassesAA,
        `Theme ${theme.name} light canvas text contrast failed: ${evaluation.lightCanvasTextContrast.toFixed(2)}:1`
      ).toBe(true)
      expect(evaluation.lightCanvasTextContrast).toBeGreaterThanOrEqual(10.0)

      expect(
        evaluation.darkCanvasPassesAA,
        `Theme ${theme.name} dark canvas text contrast failed: ${evaluation.darkCanvasTextContrast.toFixed(2)}:1`
      ).toBe(true)
      expect(evaluation.darkCanvasTextContrast).toBeGreaterThanOrEqual(10.0)

      expect(
        evaluation.lightIconPassesAA,
        `Theme ${theme.name} light icon contrast failed: ${evaluation.lightIconContrast.toFixed(2)}:1`
      ).toBe(true)
      expect(evaluation.lightIconContrast).toBeGreaterThanOrEqual(3.0)

      expect(
        evaluation.darkIconPassesAA,
        `Theme ${theme.name} dark icon contrast failed: ${evaluation.darkIconContrast.toFixed(2)}:1`
      ).toBe(true)
      expect(evaluation.darkIconContrast).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('guarantees resting icon contrast across all 360 degrees of the hue dial', () => {
    const defaultChroma = 0.16
    for (let hue = 0; hue < 360; hue++) {
      const evaluation = evaluateCanvasContrast(hue, defaultChroma)
      expect(evaluation.lightIconPassesAA).toBe(true)
      expect(evaluation.darkIconPassesAA).toBe(true)
    }
  })
})
