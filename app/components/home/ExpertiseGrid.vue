<script setup lang="ts">
import { ref } from 'vue'
import type { SkillCategory } from '~/types'

interface Props {
  categories: SkillCategory[]
}

defineProps<Props>()

const hoveredSkill = ref<string | null>(null)

function openDocumentation(url?: string) {
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

function getCategoryColor(categoryId: string): string {
  const colors: Record<string, string> = {
    languages: 'from-blue-500 to-blue-600',
    'cloud-devops': 'from-orange-500 to-orange-600',
    'ai-ml': 'from-purple-500 to-purple-600',
    tools: 'from-green-500 to-green-600'
  }
  return colors[categoryId] || 'from-gray-500 to-gray-600'
}

function getCategoryBgColor(categoryId: string): string {
  const colors: Record<string, string> = {
    languages: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30',
    'cloud-devops':
      'bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30',
    'ai-ml': 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    tools: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
  }
  return (
    colors[categoryId] ||
    'bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/30'
  )
}
</script>

<template>
  <section class="py-6 sm:py-8" aria-labelledby="expertise-heading">
    <h2
      id="expertise-heading"
      class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
    >
      Technical Expertise
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <article
        v-for="category in categories"
        :key="category.id"
        class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <!-- Category Header -->
        <div class="flex items-center gap-3 mb-3 sm:mb-4">
          <div
            :class="['w-1 h-6 sm:h-8 rounded-full bg-gradient-to-b', getCategoryColor(category.id)]"
            aria-hidden="true"
          ></div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {{ category.label }}
          </h3>
        </div>

        <!-- Skills Grid -->
        <ul class="flex flex-wrap gap-1.5 sm:gap-2" :aria-label="`${category.label} skills`">
          <li v-for="skill in category.skills" :key="skill.name">
            <button
              type="button"
              :class="[
                'relative inline-flex items-center gap-1.5 min-h-[36px] sm:min-h-[40px] px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500',
                getCategoryBgColor(category.id),
                skill.docUrl ? 'cursor-pointer' : 'cursor-default'
              ]"
              :aria-label="
                skill.docUrl ? `${skill.name} - Click to view documentation` : skill.name
              "
              @click="openDocumentation(skill.docUrl)"
              @mouseenter="hoveredSkill = skill.name"
              @mouseleave="hoveredSkill = null"
              @focus="hoveredSkill = skill.name"
              @blur="hoveredSkill = null"
            >
              <i
                v-if="skill.icon"
                :class="`devicon-${skill.icon}-plain text-base`"
                aria-hidden="true"
              />
              <span class="text-gray-700 dark:text-gray-300">
                {{ skill.name }}
              </span>

              <!-- Tooltip -->
              <Transition
                enter-active-class="transition-opacity duration-150"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <span
                  v-if="hoveredSkill === skill.name && skill.docUrl"
                  class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded whitespace-nowrap z-10"
                  role="tooltip"
                >
                  View docs
                  <span
                    class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"
                    aria-hidden="true"
                  ></span>
                </span>
              </Transition>
            </button>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>
