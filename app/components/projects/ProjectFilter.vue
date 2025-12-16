<script setup lang="ts">
import type { Project } from '~/types'

type FilterType = Project['type'] | 'all'

interface Props {
  modelValue: FilterType
}

interface Emits {
  (e: 'update:modelValue', value: FilterType): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

interface FilterOption {
  value: FilterType
  label: string
}

const filterOptions: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'ai-ml', label: 'AI/ML' },
  { value: 'full-stack', label: 'Full-Stack' },
  { value: 'research', label: 'Research' },
  { value: 'cloud', label: 'Cloud' }
]

function selectFilter(value: FilterType) {
  emit('update:modelValue', value)
}
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
    role="group"
    aria-label="Filter projects by type"
  >
    <button
      v-for="option in filterOptions"
      :key="option.value"
      type="button"
      :class="[
        'min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        modelValue === option.value
          ? 'bg-sky-600 text-white shadow-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
      ]"
      :aria-pressed="modelValue === option.value"
      @click="selectFilter(option.value)"
    >
      {{ option.label }}
    </button>
  </nav>
</template>
