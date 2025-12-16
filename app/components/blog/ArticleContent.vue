<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Article } from '~/types'
import { codeToHtml } from 'shiki'
import DOMPurify from 'dompurify'

interface Props {
  article: Article
}

const props = defineProps<Props>()

const renderedContent = ref('')
const isLoading = ref(true)
const coverImageError = ref(false)

function handleCoverImageError() {
  coverImageError.value = true
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

async function highlightCodeBlocks(html: string): Promise<string> {
  // Find all code blocks and highlight them with Shiki
  const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g
  let result = html
  const matches = [...html.matchAll(codeBlockRegex)]

  for (const match of matches) {
    const [fullMatch, lang, code] = match
    if (!code) continue
    try {
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")

      const highlighted = await codeToHtml(decodedCode, {
        lang: lang || 'text',
        theme: 'github-dark'
      })
      result = result.replace(fullMatch, highlighted)
    } catch {
      // If highlighting fails, keep original
    }
  }

  return result
}

function processBlockquotes(content: string): string {
  const lines = content.split('\n')
  const result: string[] = []
  let blockquoteLines: string[] = []

  for (const line of lines) {
    const blockquoteMatch = line.match(/^>\s?(.*)$/)
    if (blockquoteMatch) {
      blockquoteLines.push(blockquoteMatch[1] || '')
    } else {
      if (blockquoteLines.length > 0) {
        const blockquoteContent = blockquoteLines
          .map((l) => l.trim())
          .filter((l) => l.length > 0)
          .join('<br />')
        result.push(`<blockquote>${blockquoteContent}</blockquote>`)
        blockquoteLines = []
      }
      result.push(line)
    }
  }

  if (blockquoteLines.length > 0) {
    const blockquoteContent = blockquoteLines
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .join('<br />')
    result.push(`<blockquote>${blockquoteContent}</blockquote>`)
  }

  return result.join('\n')
}

async function renderMarkdown(content: string): Promise<string> {
  // First process blockquotes to handle multi-line quotes
  const processed = processBlockquotes(content)

  // Simple markdown to HTML conversion
  let html = processed
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      return `<pre><code class="language-${lang || 'text'}">${escapedCode}</code></pre>`
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Tables
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter((cell) => cell.trim())
      const isHeader = cells.some((cell) => cell.includes('---'))
      if (isHeader) return ''
      return `<tr>${cells.map((cell) => `<td>${cell.trim()}</td>`).join('')}</tr>`
    })
    // Paragraphs (wrap remaining text)
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('<') || block.trim() === '') return block
      return `<p>${block.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')

  // Wrap tables
  html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="min-w-full">$&</table>')

  // Highlight code blocks
  html = await highlightCodeBlocks(html)

  // Sanitize HTML to prevent XSS attacks
  html = DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['target', 'rel', 'loading']
  })

  return html
}

async function processContent() {
  isLoading.value = true
  try {
    renderedContent.value = await renderMarkdown(props.article.content)
  } finally {
    isLoading.value = false
  }
}

onMounted(processContent)
watch(() => props.article.content, processContent)
</script>

<template>
  <article class="max-w-4xl mx-auto">
    <!-- Article Header -->
    <header class="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
      <!-- Tags -->
      <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-200"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Title -->
      <h1
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
      >
        {{ article.title }}
      </h1>

      <!-- Meta -->
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ article.readingTime }} min read
        </span>
      </div>
    </header>

    <!-- Cover Image -->
    <div
      v-if="article.coverImage && !coverImageError"
      class="mb-8 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700"
    >
      <img
        :src="article.coverImage"
        :alt="article.title"
        class="w-full h-auto"
        loading="lazy"
        @error="handleCoverImageError"
      />
    </div>
    <!-- Fallback when cover image fails to load -->
    <div
      v-else-if="article.coverImage && coverImageError"
      class="mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 aspect-video flex items-center justify-center"
    >
      <svg
        class="w-16 h-16 text-gray-300 dark:text-gray-600"
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

    <!-- Loading State -->
    <div v-if="isLoading" class="animate-pulse space-y-4">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
    </div>

    <!-- Article Content -->
    <!-- eslint-disable vue/no-v-html -- Required for rendering sanitized markdown -->
    <div
      v-else
      class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-pre:bg-gray-900 prose-pre:text-gray-100"
      v-html="renderedContent"
    />
    <!-- eslint-enable vue/no-v-html -->
  </article>
</template>
