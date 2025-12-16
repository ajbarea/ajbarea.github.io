import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom',
      },
    },
    include: ['app/**/__tests__/**/*.test.ts'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
})
