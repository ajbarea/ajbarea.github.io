<script setup lang="ts">
useHead({
  title: '404 - Page Not Found | AJ Barea',
  meta: [
    {
      name: 'description',
      content: 'The page you are looking for could not be found.'
    },
    { property: 'og:title', content: '404 - Page Not Found | AJ Barea' },
    {
      property: 'og:description',
      content: 'The page you are looking for could not be found.'
    },
    { property: 'og:image', content: '/images/og-image.png' },
    { property: 'og:url', content: 'https://ajbarea.github.io/404' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: '404 - Page Not Found | AJ Barea' },
    {
      name: 'twitter:description',
      content: 'The page you are looking for could not be found.'
    },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<template>
  <main
    class="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
    role="alert"
    aria-labelledby="error-title"
  >
    <div class="space-y-4 sm:space-y-6">
      <p class="text-6xl sm:text-8xl font-bold text-gray-300 dark:text-gray-700" aria-hidden="true">
        404
      </p>
      <h1
        id="error-title"
        class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200"
      >
        Page Not Found
      </h1>
      <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        Back to Home
      </NuxtLink>
    </div>
  </main>
</template>
