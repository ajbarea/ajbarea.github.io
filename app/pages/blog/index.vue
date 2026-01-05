<script setup lang="ts">
const { data: articles } = await useAsyncData('blog-articles', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

useHead({
  title: 'Blog | AJ Barea',
  meta: [
    {
      name: 'description',
      content:
        'Technical articles and insights on software engineering, AI/ML, cloud development, and programming best practices by AJ Barea.'
    },
    { property: 'og:title', content: 'Blog | AJ Barea' },
    {
      property: 'og:description',
      content:
        'Technical articles and insights on software engineering, AI/ML, cloud development, and programming best practices.'
    },
    {
      property: 'og:image',
      content: 'https://res.cloudinary.com/dumwa1w5x/image/upload/q_auto,f_auto/portfolio_ujli4t'
    },
    { property: 'og:url', content: 'https://ajbarea.github.io/blog' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Blog | AJ Barea' },
    {
      name: 'twitter:description',
      content:
        'Technical articles and insights on software engineering, AI/ML, and cloud development.'
    }
  ]
})
</script>

<template>
  <main class="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Thoughts on software engineering, AI/ML, cloud development, and lessons learned along the
          way.
        </p>
      </header>

      <div v-if="articles && articles.length > 0" class="space-y-8">
        <article
          v-for="article in articles"
          :key="article.stem"
          class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <NuxtLink :to="`/blog/${article.stem?.replace('articles/', '')}`" class="block p-5">
            <div class="flex flex-col sm:flex-row gap-4">
              <div
                v-if="article.image"
                class="sm:w-40 md:w-48 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
              >
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div
                  v-if="article.tags && article.tags.length > 0"
                  class="flex flex-wrap gap-2 mb-2"
                >
                  <span
                    v-for="tag in article.tags"
                    :key="tag"
                    class="px-2 py-0.5 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-200"
                  >
                    {{ tag }}
                  </span>
                </div>
                <h2
                  class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2"
                >
                  {{ article.title }}
                </h2>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                  {{ article.description }}
                </p>
                <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                  <span>{{ article.author }}</span>
                  <span>•</span>
                  <time :datetime="article.date">{{
                    new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })
                  }}</time>
                </div>
              </div>
            </div>
          </NuxtLink>
        </article>
      </div>

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
