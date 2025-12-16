<script setup lang="ts">
import { computed } from 'vue'
import { getArticleBySlug, getRelatedArticles } from '~/data/articles'

const route = useRoute()

const slug = computed(() => route.params.slug as string)
const article = computed(() => getArticleBySlug(slug.value))
const relatedArticles = computed(() => (article.value ? getRelatedArticles(slug.value, 3) : []))

// Dynamic SEO meta tags
useHead(
  computed(() => {
    if (!article.value) {
      return {
        title: 'Article Not Found | AJ Barea'
      }
    }

    return {
      title: `${article.value.title} | AJ Barea`,
      meta: [
        { name: 'description', content: article.value.excerpt },
        { property: 'og:title', content: article.value.title },
        { property: 'og:description', content: article.value.excerpt },
        { property: 'og:url', content: `https://ajbarea.github.io/blog/${article.value.slug}` },
        { property: 'og:type', content: 'article' },
        {
          property: 'og:image',
          content: article.value.coverImage || '/images/og-image.png'
        },
        { property: 'article:published_time', content: article.value.date },
        { property: 'article:author', content: article.value.author },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: article.value.title },
        { name: 'twitter:description', content: article.value.excerpt }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.value.title,
            description: article.value.excerpt,
            image: article.value.coverImage,
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
</script>

<template>
  <main class="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
    <!-- Article Found -->
    <template v-if="article">
      <div class="max-w-4xl mx-auto">
        <!-- Back to Blog Link -->
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

        <!-- Article Content -->
        <BlogArticleContent :article="article" />

        <!-- Related Articles -->
        <section
          v-if="relatedArticles.length > 0"
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
            <BlogCard
              v-for="relatedArticle in relatedArticles"
              :key="relatedArticle.slug"
              :article="relatedArticle"
            />
          </div>
        </section>
      </div>
    </template>

    <!-- Article Not Found -->
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
