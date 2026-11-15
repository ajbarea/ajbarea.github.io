import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import PaletteStudio from '../PaletteStudio.vue'
import { useThemeStore } from '~/stores/theme'
import { PALETTE_THEMES } from '~/data/themes'

describe('PaletteStudio Component', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.style.cssText = ''
  })

  it('renders accessible trigger button with initial Ember theme indicator', () => {
    const wrapper = mount(PaletteStudio)
    const button = wrapper.find('button[aria-haspopup="dialog"]')
    expect(button.exists()).toBe(true)
    expect(button.attributes('aria-label')).toContain('Palette Studio: Ember')
    expect(button.attributes('aria-expanded')).toBe('false')
  })

  it('opens dialog on trigger click and displays all 11 named themes', async () => {
    const wrapper = mount(PaletteStudio)
    const button = wrapper.find('button[aria-haspopup="dialog"]')
    await button.trigger('click')

    expect(button.attributes('aria-expanded')).toBe('true')
    const dialog = wrapper.find('div[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    expect(dialog.attributes('aria-label')).toBe('Palette Studio')

    const radiogroup = wrapper.find('div[role="radiogroup"][aria-label="Preset color themes"]')
    expect(radiogroup.exists()).toBe(true)

    const themeRadios = radiogroup.findAll('button[role="radio"]')
    expect(themeRadios.length).toBe(11)

    // Check Ember is checked by default
    const emberRadio = themeRadios[0]
    expect(emberRadio.text()).toContain('Ember')
    expect(emberRadio.attributes('aria-checked')).toBe('true')
  })

  it('selects a theme when clicking a radio option', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    const setPaletteThemeSpy = vi.spyOn(themeStore, 'setPaletteTheme')

    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    const themeRadios = wrapper.findAll(
      'div[role="radiogroup"][aria-label="Preset color themes"] button[role="radio"]'
    )
    // Click 'Forest' (index 7)
    const forestIndex = PALETTE_THEMES.findIndex((t) => t.id === 'forest')
    await themeRadios[forestIndex].trigger('click')

    expect(setPaletteThemeSpy).toHaveBeenCalledWith('forest')
    expect(themeStore.currentThemeId).toBe('forest')
  })

  it('provides a continuous hue dial slider with aria-valuetext', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    const slider = wrapper.find('input[type="range"]')
    expect(slider.exists()).toBe(true)
    expect(slider.attributes('min')).toBe('0')
    expect(slider.attributes('max')).toBe('360')
    expect(slider.attributes('aria-valuetext')).toContain('hue 38°, Ember-like')

    // Change hue dial to 200° (Ocean-like)
    await slider.setValue('200')
    expect(themeStore.customHue).toBe(200)
    expect(slider.attributes('aria-valuetext')).toContain('hue 200°, Ocean-like')
  })

  it('resets custom hue when clicking the Reset button', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    themeStore.setCustomHue(180)

    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')
    expect(wrapper.text()).toContain('Reset')

    const buttons = wrapper.findAll('button')
    const reset = buttons.find((b) => b.text().trim() === 'Reset')
    expect(reset?.exists()).toBe(true)
    await reset?.trigger('click')

    expect(themeStore.customHue).toBeNull()
  })

  it('closes dialog on Escape keydown', async () => {
    const wrapper = mount(PaletteStudio, { attachTo: document.body })
    const button = wrapper.find('button[aria-haspopup="dialog"]')
    await button.trigger('click')
    expect(wrapper.find('div[role="dialog"]').exists()).toBe(true)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await wrapper.vm.$nextTick()

    expect(wrapper.find('div[role="dialog"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('navigates theme radios via arrow keys', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    const themeRadios = wrapper.findAll(
      'div[role="radiogroup"][aria-label="Preset color themes"] button[role="radio"]'
    )
    // First is Ember (index 0). ArrowRight moves to Terracotta (index 1)
    await themeRadios[0].trigger('keydown', { key: 'ArrowRight' })

    expect(themeStore.currentThemeId).toBe('terracotta')
  })

  it('adjusts hue dial using -5° and +5° steppers', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    const initialHue = themeStore.activeHue
    const stepUpBtn = wrapper.find('button[aria-label="Increase hue by 5 degrees"]')
    expect(stepUpBtn.exists()).toBe(true)
    await stepUpBtn.trigger('click')
    expect(themeStore.activeHue).toBe((initialHue + 5) % 360)

    const stepDownBtn = wrapper.find('button[aria-label="Decrease hue by 5 degrees"]')
    expect(stepDownBtn.exists()).toBe(true)
    await stepDownBtn.trigger('click')
    expect(themeStore.activeHue).toBe(initialHue)
  })

  it('selects surface mode from surface atmosphere options', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    const surfaceRadios = wrapper.findAll(
      'div[role="radiogroup"][aria-label="Surface tone selection"] button[role="radio"]'
    )
    expect(surfaceRadios.length).toBe(3)

    // Click OLED Pure Black
    const oledRadio = surfaceRadios.find((r) => r.text().includes('OLED Pure Black'))
    expect(oledRadio?.exists()).toBe(true)
    await oledRadio?.trigger('click')

    expect(themeStore.surfaceMode).toBe('oled')
  })

  it('swatch buttons activate light ambiance (swatch 50) and dark ambiance (swatch 950)', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    const swatch50 = wrapper.find('button[aria-label="Swatch 50: Light Ambiance Canvas"]')
    expect(swatch50.exists()).toBe(true)
    await swatch50.trigger('click')
    expect(themeStore.theme).toBe('light')

    const swatch950 = wrapper.find('button[aria-label="Swatch 950: Dark Ambiance Canvas"]')
    expect(swatch950.exists()).toBe(true)
    await swatch950.trigger('click')
    expect(themeStore.theme).toBe('dark')
  })

  it('displays curated default badges on Ember and Forest theme cards', async () => {
    const wrapper = mount(PaletteStudio)
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    expect(wrapper.text()).toContain('Light')
    expect(wrapper.text()).toContain('Dark')
    expect(wrapper.text()).toContain('Curated Defaults:')
  })

  it('triggers resetToDefaults() when clicking Reset to Defaults button', async () => {
    const wrapper = mount(PaletteStudio)
    const themeStore = useThemeStore()
    const resetSpy = vi.spyOn(themeStore, 'resetToDefaults')
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')

    const buttons = wrapper.findAll('button')
    const resetBtn = buttons.find((b) => b.text().includes('Reset to Defaults'))
    expect(resetBtn?.exists()).toBe(true)
    await resetBtn?.trigger('click')

    expect(resetSpy).toHaveBeenCalledTimes(1)
  })
})
