import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom'
      }
    },
    include: ['app/**/__tests__/**/*.test.ts'],
    exclude: ['e2e/**', 'node_modules/**'],
    pool: 'forks'
    // Forward-compat note: when the runtime moves to Node 25+, re-add
    // `poolOptions.forks.execArgv: ['--no-webstorage']` to suppress the
    // Web Storage globals (`localStorage` / `sessionStorage`) that Node 25
    // enables by default and that conflict with jsdom's stubs. The flag
    // doesn't exist on Node 24 ("bad option" exit 1), so it stays out
    // until the runtime catches up.
  }
})
