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

  routeRules: {
    '/portfolio': { redirect: '/' },
    '/portfolio/**': { redirect: '/' }
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    },
    baseUrl: 'https://ajbarea.github.io',
    locales: [
      { code: 'en', language: 'en', file: 'en.json', name: 'English' },
      { code: 'es', language: 'es', file: 'es.json', name: 'Español' },
      { code: 'ja', language: 'ja', file: 'ja.json', name: '日本語' },
      { code: 'zh', language: 'zh-CN', file: 'zh.json', name: '中文' }
    ]
  },

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dumwa1w5x/image/upload/'
    }
  },

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
        { rel: 'preconnect', href: 'https://res.cloudinary.com' },
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
  },

  runtimeConfig: {
    public: {
      // Get your free key at https://web3forms.com
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || ''
    }
  }
})
