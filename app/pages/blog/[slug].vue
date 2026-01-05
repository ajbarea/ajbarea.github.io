<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: article } = await useAsyncData(`blog-${slug.value}`, () =>
  queryCollection('blog').where('stem', '=', `articles/${slug.value}`).first()
)

const { data: relatedArticles } = await useAsyncData(`blog-related-${slug.value}`, () =>
  queryCollection('blog')
    .where('stem', '<>', `articles/${slug.value}`)
    .order('date', 'DESC')
    .limit(3)
    .all()
)

useHead(
  computed(() => {
    if (!article.value) {
      return { title: 'Article Not Found | AJ Barea' }
    }

    return {
      title: `${article.value.title} | AJ Barea`,
      meta: [
        { name: 'description', content: article.value.description },
        { property: 'og:title', content: article.value.title },
        { property: 'og:description', content: article.value.description },
        { property: 'og:url', content: `https://ajbarea.github.io/blog/${slug.value}` },
        { property: 'og:type', content: 'article' },
        {
          property: 'og:image',
          content:
            article.value.image ||
            'https://res.cloudinary.com/dumwa1w5x/image/upload/q_auto,f_auto/portfolio_ujli4t'
        },
        { property: 'article:published_time', content: article.value.date },
        { property: 'article:author', content: article.value.author },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: article.value.title },
        { name: 'twitter:description', content: article.value.description }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.value.title,
            description: article.value.description,
            image: article.value.image,
            datePublished: article.value.date,
            author: {
              '@type': 'Person',
              name: article.value.author
            },
            publisher: {
              '@type': 'Person',
              name: 'AJ Barea'
            }
          })
        }
      ]
    }
  })
)

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <main class="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
    <template v-if="article">
      <div class="max-w-4xl mx-auto">
        <nav class="mb-6 sm:mb-8" aria-label="Breadcrumb">
          <NuxtLink
            to="/blog"
            class="inline-flex items-center gap-2 min-h-[44px] text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg px-2 -ml-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blog
          </NuxtLink>
        </nav>

        <article class="max-w-4xl mx-auto">
          <header class="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-200"
              >
                {{ tag }}
              </span>
            </div>

            <h1
              class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              {{ article.title }}
            </h1>

            <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
              <span class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {{ article.author }}
              </span>
              <span class="flex items-center gap-2">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <time :datetime="article.date">{{ formatDate(article.date) }}</time>
              </span>
            </div>
          </header>

          <div
            v-if="article.image"
            class="mb-8 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700"
          >
            <img :src="article.image" :alt="article.title" class="w-full h-auto" loading="lazy" />
          </div>

          <ContentRenderer
            :value="article"
            class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-gray-900 prose-pre:text-gray-100"
          />
        </article>

        <section
          v-if="relatedArticles && relatedArticles.length > 0"
          class="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200 dark:border-gray-700"
          aria-labelledby="related-articles-heading"
        >
          <h2
            id="related-articles-heading"
            class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8"
          >
            Continue Reading
          </h2>
          <div class="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="relatedArticle in relatedArticles"
              :key="relatedArticle.stem"
              class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <NuxtLink
                :to="`/blog/${relatedArticle.stem?.replace('articles/', '')}`"
                class="block p-6"
              >
                <h3
                  class="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                >
                  {{ relatedArticle.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {{ relatedArticle.description }}
                </p>
              </NuxtLink>
            </article>
          </div>
        </section>
      </div>
    </template>

    <template v-else>
      <div class="max-w-2xl mx-auto text-center py-12 sm:py-16" role="alert">
        <svg
          class="w-16 sm:w-20 h-16 sm:h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4 sm:mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Article Not Found
        </h1>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
          Sorry, the article you're looking for doesn't exist or has been moved.
        </p>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </NuxtLink>
      </div>
    </template>
  </main>
</template>
