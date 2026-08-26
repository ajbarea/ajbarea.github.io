import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  nitro: {
    prerender: {
      // /blog is deliberately absent: the articles are placeholder drafts AJ did
      // not write, so the section is withdrawn rather than shipped. Restore this
      // route, the nav link, and the sitemap exclude together when real posts land.
      routes: ['/', '/projects', '/gallery', '/resume', '/rss.xml', '/atom.xml'],
      crawlLinks: true
    }
  },

  routeRules: {
    '/portfolio': { redirect: '/' },
    '/portfolio/**': { redirect: '/' },
    // Dropping /blog from the prerender list is not enough: @nuxt/content
    // discovers the routes and builds them anyway. Redirecting also gives the
    // 24 URLs already indexed across four locales somewhere to land.
    '/blog': { redirect: '/' },
    '/blog/**': { redirect: '/' },
    '/*/blog': { redirect: '/' },
    '/*/blog/**': { redirect: '/' }
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/i18n',
    // research(2026-05): @nuxtjs/sitemap (v8) + @nuxtjs/robots (v6) — the Nuxt
    // SEO discoverability modules. Sitemap auto-integrates with @nuxtjs/i18n
    // (emits hreflang xhtml:link alternates) and auto-includes prerendered
    // routes, replacing the hand-maintained public/sitemap.xml that had gone
    // stale (5 of 46 routes, no localized URLs, lastmod frozen 2025-12-15).
    // Listed after i18n per docs. Source: https://nuxtseo.com/docs/sitemap/guides/i18n
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  // Canonical site URL for nuxt-site-config (read by the sitemap + robots
  // modules to build absolute <loc> URLs and the robots Sitemap directive).
  // Matches the i18n baseUrl below; this is a GitHub Pages user site at root.
  site: {
    url: 'https://ajbarea.github.io',
    name: 'AJ Barea'
  },

  // Hiding the nav link does not unpublish anything: the sitemap is what search
  // engines read, and it was advertising 24 blog URLs across four locales.
  sitemap: {
    exclude: ['/blog', '/blog/**', '/*/blog', '/*/blog/**']
  },

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

  // Default IPX provider — serves local `public/images/` and generates
  // responsive WebP/AVIF variants at `nuxt generate` time. No external CDN.
  image: {
    format: ['webp']
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
      // Runs before first paint. Without it the dark class only lands after
      // hydration, and because the layout animates background colour over 200ms
      // while text colour switches instantly, a dark-mode visitor gets a flash
      // of white text on a white background on every page load. The theme store
      // still owns changes after this; this only settles the first frame.
      script: [
        {
          innerHTML:
            "try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}",
          tagPosition: 'head',
          tagPriority: 'critical'
        }
      ],
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
        },
        // Feed autodiscovery — readers + browsers pick these up from the head.
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'AJ Barea · Research & Activity',
          href: 'https://ajbarea.github.io/rss.xml'
        },
        {
          rel: 'alternate',
          type: 'application/atom+xml',
          title: 'AJ Barea · Research & Activity',
          href: 'https://ajbarea.github.io/atom.xml'
        }
      ]
    }
  },

  css: ['~/assets/styles/main.css'],

  typescript: {
    strict: true
  }
})
