import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  nitro: {
    prerender: {
      routes: ['/', '/projects', '/gallery', '/resume', '/blog'],
      crawlLinks: true
    }
  },

  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxt/eslint'],

  vite: {
    build: {
      chunkSizeWarningLimit: 800
    },
    plugins: [
      tailwindcss(),
      {
        name: 'suppress-tailwind-sourcemap-warning',
        apply: 'build',
        configResolved(config) {
          const originalOnWarn = config.build.rollupOptions.onwarn
          config.build.rollupOptions.onwarn = (warning, warn) => {
            if (
              warning.code === 'SOURCEMAP_BROKEN' &&
              warning.plugin === '@tailwindcss/vite:generate:build'
            ) {
              return
            }
            if (originalOnWarn) {
              originalOnWarn(warning, warn)
            } else {
              warn(warning)
            }
          }
        }
      }
    ]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
        }
      ]
    }
  },

  css: ['~/assets/styles/main.css'],

  typescript: {
    strict: true
  }
})
