<script setup lang="ts">
import { ref } from 'vue'
import type { Article } from '~/types'

interface Props {
  article: Article
}

defineProps<Props>()

const imageError = ref(false)

function handleImageError() {
  imageError.value = true
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<template>
  <article
    class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
  >
    <NuxtLink
      :to="`/blog/${article.slug}`"
      class="block focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset rounded-xl"
      :aria-label="`Read article: ${article.title}`"
    >
      <!-- Cover Image (if available) -->
      <div
        v-if="article.coverImage && !imageError"
        class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700"
      >
        <img
          :src="article.coverImage"
          :alt="`Cover image for ${article.title}`"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          @error="handleImageError"
        />
      </div>
      <!-- Fallback when image fails to load -->
      <div
        v-else-if="article.coverImage && imageError"
        class="aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center"
      >
        <svg
          class="w-12 h-12 text-gray-300 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <!-- Content -->
      <div class="p-4 sm:p-6">
        <!-- Tags -->
        <ul
          v-if="article.tags && article.tags.length > 0"
          class="flex flex-wrap gap-1.5 sm:gap-2 mb-3"
          aria-label="Article tags"
        >
          <li
            v-for="tag in article.tags.slice(0, 3)"
            :key="tag"
            class="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-200"
          >
            {{ tag }}
          </li>
        </ul>

        <!-- Title -->
        <h2
          class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2"
        >
          {{ article.title }}
        </h2>

        <!-- Excerpt -->
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {{ article.excerpt }}
        </p>

        <!-- Meta -->
        <div
          class="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
        >
          <time :datetime="article.date">
            {{ formatDate(article.date) }}
          </time>
          <span class="flex items-center gap-1">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span aria-label="Reading time">{{ article.readingTime }} min read</span>
          </span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
