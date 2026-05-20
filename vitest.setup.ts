/**
 * Vitest global setup — installs vue-i18n as a Vue plugin on every
 * @vue/test-utils mount. Without this, components that call $t at
 * render time throw "Need to install with `app.use` function" because
 * the test environment doesn't auto-install Nuxt plugins.
 *
 * Loads the canonical en.json so $t('meta.resumeTitle') resolves to the
 * real string rather than a stub; tests can assert against the actual
 * UX surface instead of a fixture key.
 */

import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import en from './i18n/locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en }
})

config.global.plugins = [...(config.global.plugins ?? []), i18n]
