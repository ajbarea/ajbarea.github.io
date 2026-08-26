<script setup lang="ts">
import type { SkillCategory } from '~/types'

interface Props {
  categories: SkillCategory[]
}

defineProps<Props>()
</script>

<template>
  <!--
    This was four bordered cards, four gradient rules, and roughly forty icon
    buttons with hover tooltips: the densest block on the page, for content that
    is a list of nouns. Whitespace groups the categories now instead of borders,
    and the names are set as text. The resume keeps the detailed grid, where a
    reader has actually asked for that level of detail.
  -->
  <section class="mb-12" aria-labelledby="expertise-heading">
    <h2
      id="expertise-heading"
      class="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6"
    >
      {{ $t('sections.expertise') }}
    </h2>

    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
      <div v-for="category in categories" :key="category.id">
        <dt
          class="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5"
        >
          {{ $t('skills.categories.' + category.id) }}
        </dt>
        <dd class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {{ category.skills.map((s) => s.name).join(', ') }}
        </dd>
      </div>
    </dl>
  </section>
</template>
