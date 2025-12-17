<script setup lang="ts">
import type { SkillCategory } from '~/types'

interface Props {
  categories: SkillCategory[]
}

defineProps<Props>()

function getCategoryColor(categoryId: string): string {
  const colors: Record<string, string> = {
    languages: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
    'cloud-devops': 'border-orange-500 bg-orange-50 dark:bg-orange-900/20',
    'ai-ml': 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
    tools: 'border-green-500 bg-green-50 dark:bg-green-900/20'
  }
  return colors[categoryId] || 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
}

function getCategoryTextColor(categoryId: string): string {
  const colors: Record<string, string> = {
    languages: 'text-blue-700 dark:text-blue-300',
    'cloud-devops': 'text-orange-700 dark:text-orange-300',
    'ai-ml': 'text-purple-700 dark:text-purple-300',
    tools: 'text-green-700 dark:text-green-300'
  }
  return colors[categoryId] || 'text-gray-700 dark:text-gray-300'
}
</script>

<template>
  <section>
    <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <svg
        class="w-5 h-5 text-primary-600 dark:text-primary-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
      Technical Skills
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="category in categories"
        :key="category.id"
        :class="['rounded-lg p-4 border-l-4', getCategoryColor(category.id)]"
      >
        <h3 :class="['text-sm font-semibold mb-2', getCategoryTextColor(category.id)]">
          {{ category.label }}
        </h3>
        <div class="flex flex-wrap gap-1.5">
          <a
            v-for="skill in category.skills"
            :key="skill.name"
            :href="skill.docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
            :title="`View ${skill.name} documentation`"
          >
            <i
              v-if="skill.icon"
              :class="`devicon-${skill.icon}-plain text-sm`"
              aria-hidden="true"
            />
            <span>{{ skill.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
