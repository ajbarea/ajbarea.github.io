<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectType } from '~/types'

type FilterType = ProjectType | 'all'

interface Props {
  modelValue: FilterType
}

interface Emits {
  (e: 'update:modelValue', value: FilterType): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const { t } = useI18n()

interface FilterOption {
  value: FilterType
  labelKey: string
}

const filterOptions: FilterOption[] = [
  { value: 'all', labelKey: 'projects.page.filterAll' },
  { value: 'ai-ml', labelKey: 'projects.types.ai-ml' },
  { value: 'full-stack', labelKey: 'projects.types.full-stack' },
  { value: 'robotics', labelKey: 'projects.types.robotics' },
  { value: 'cloud', labelKey: 'projects.types.cloud' }
]

const labeledOptions = computed(() =>
  filterOptions.map((opt) => ({ value: opt.value, label: t(opt.labelKey) }))
)

function selectFilter(value: FilterType) {
  emit('update:modelValue', value)
}
</script>

<template>
  <nav
    class="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
    role="group"
    :aria-label="$t('projects.page.filterAria')"
  >
    <button
      v-for="option in labeledOptions"
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
