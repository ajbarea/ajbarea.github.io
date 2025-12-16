<script setup lang="ts">
import { getArticlesSortedByDate } from '~/data/articles'

const articles = getArticlesSortedByDate()

useHead({
  title: 'Blog | AJ Barea',
  meta: [
    {
      name: 'description',
      content:
        'Technical articles and insights on software engineering, AI/ML, cloud development, and programming best practices by AJ Barea.',
    },
    { property: 'og:title', content: 'Blog | AJ Barea' },
    {
      property: 'og:description',
      content:
        'Technical articles and insights on software engineering, AI/ML, cloud development, and programming best practices.',
    },
    { property: 'og:image', content: '/images/og-image.png' },
    { property: 'og:url', content: 'https://ajbarea.github.io/blog' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Blog | AJ Barea' },
    {
      name: 'twitter:description',
      content:
        'Technical articles and insights on software engineering, AI/ML, and cloud development.',
    },
  ],
})
</script>

<template>
  <main class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Thoughts on software engineering, AI/ML, cloud development, and lessons learned along the
          way.
        </p>
      </header>

      <!-- Articles Grid -->
      <div v-if="articles.length > 0" class="space-y-8">
        <BlogCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <svg
          class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <p class="text-gray-500 dark:text-gray-400 text-lg">No articles yet. Check back soon!</p>
      </div>
    </div>
  </main>
</template>
