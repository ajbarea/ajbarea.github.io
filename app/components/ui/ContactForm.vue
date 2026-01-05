<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '~/composables/useToast'
import { useClipboard } from '~/composables/useClipboard'

interface Props {
  email?: string
}

const props = withDefaults(defineProps<Props>(), {
  email: 'ajbareaa@gmail.com'
})

const toast = useToast()
const clipboard = useClipboard()

const form = ref({
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSuccess = ref(false)

const isValid = computed(() => {
  return form.value.message.trim().length > 0
})

// Web3Forms access key - get yours at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = useRuntimeConfig().public.web3formsKey || ''

async function copyEmailFallback() {
  await clipboard.copy(
    props.email,
    `Email copied: ${props.email} - Please send your message directly!`
  )
}

async function handleSubmit() {
  if (!isValid.value || isSubmitting.value) return

  // If Web3Forms isn't configured, copy email to clipboard
  if (!WEB3FORMS_ACCESS_KEY) {
    await copyEmailFallback()
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        to_email: props.email,
        from_name: form.value.email || 'Anonymous',
        email: form.value.email || 'no-reply@example.com',
        message: form.value.message,
        subject: `Portfolio Contact: ${form.value.email || 'Anonymous'}`
      })
    })

    const result = await response.json()

    if (result.success) {
      isSuccess.value = true
      toast.success("Message sent! I'll get back to you soon.")
      form.value = { email: '', message: '' }

      // Reset success state after a delay
      setTimeout(() => {
        isSuccess.value = false
      }, 5000)
    } else {
      throw new Error(result.message || 'Failed to send message')
    }
  } catch (error) {
    toast.error('Failed to send. Email copied to clipboard!')
    console.error('Contact form error:', error)
    await copyEmailFallback()
  } finally {
    isSubmitting.value = false
  }
}

function copyEmail() {
  clipboard.copyEmail(props.email)
}
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <form v-if="!isSuccess" class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label
          for="contact-email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Your Email <span class="text-gray-400 dark:text-gray-500">(optional)</span>
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        />
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Include if you'd like a response
        </p>
      </div>

      <div>
        <label
          for="contact-message"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Message <span class="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          v-model="form.message"
          rows="4"
          required
          placeholder="Hi AJ, I wanted to reach out about..."
          class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        :disabled="!isValid || isSubmitting"
        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      >
        <svg v-if="isSubmitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
        <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
      </button>
    </form>

    <!-- Success state -->
    <div v-else class="text-center py-8">
      <div
        class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
      >
        <svg
          class="w-8 h-8 text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
      <p class="text-gray-600 dark:text-gray-400">
        Thanks for reaching out. I'll get back to you soon.
      </p>
    </div>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
          or email directly
        </span>
      </div>
    </div>

    <button
      type="button"
      class="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
      @click="copyEmail"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
      <span class="font-medium">{{ email }}</span>
      <span class="text-gray-400 text-sm">(click to copy)</span>
    </button>
  </div>
</template>
