<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

interface Props {
  fallbackMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  fallbackMessage: 'Something went wrong while loading this content.',
})

const emit = defineEmits<{
  error: [error: Error]
}>()

const hasError = ref(false)
const errorMessage = ref('')

function handleRetry() {
  hasError.value = false
  errorMessage.value = ''
}

onErrorCaptured((error: Error) => {
  hasError.value = true
  errorMessage.value = error.message || props.fallbackMessage
  emit('error', error)
  // Return false to prevent the error from propagating further
  return false
})
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <div
      class="flex flex-col items-center justify-center min-h-[200px] p-6 sm:p-8 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
      role="alert"
      aria-live="assertive"
    >
      <!-- Error Icon -->
      <svg
        class="w-12 h-12 sm:w-16 sm:h-16 text-red-400 dark:text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      <!-- Error Message -->
      <h2 class="text-lg sm:text-xl font-semibold text-red-800 dark:text-red-200 mb-2 text-center">
        Oops! Something went wrong
      </h2>
      <p class="text-sm sm:text-base text-red-600 dark:text-red-300 mb-6 text-center max-w-md">
        {{ fallbackMessage }}
      </p>

      <!-- Retry Button -->
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        @click="handleRetry"
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Try Again
      </button>
    </div>
  </div>
  <slot v-else />
</template>
