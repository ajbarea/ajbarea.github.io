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
})
