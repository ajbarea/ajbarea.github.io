<script setup lang="ts">
import { computed } from 'vue'
import { useTypewriter } from '~/composables/useTypewriter'

interface Props {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

const props = withDefaults(defineProps<Props>(), {
  typingSpeed: 100,
  deletingSpeed: 50,
  pauseDuration: 2000
})

const { displayText, isTyping } = useTypewriter(props.texts, {
  typingSpeed: props.typingSpeed,
  deletingSpeed: props.deletingSpeed,
  pauseDuration: props.pauseDuration
})

// Get the longest text to reserve space
const longestText = computed(() => props.texts.reduce((a, b) => (a.length > b.length ? a : b), ''))
</script>

<template>
  <span class="relative inline-flex items-center">
    <span class="invisible whitespace-nowrap" aria-hidden="true">{{ longestText }}</span>
    <span
      class="absolute left-0 inline-flex items-center whitespace-nowrap text-primary-600 dark:text-primary-400"
    >
      <span>{{ displayText }}</span>
      <span
        class="ml-0.5 w-0.5 h-6 bg-primary-600 dark:bg-primary-400 motion-safe:animate-pulse"
        :class="{ 'opacity-100': isTyping, 'opacity-0': !isTyping }"
        aria-hidden="true"
      ></span>
    </span>
    <span class="sr-only">{{ texts.join(', ') }}</span>
  </span>
</template>
