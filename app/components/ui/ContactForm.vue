<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useToast } from '~/composables/useToast'
import { useClipboard } from '~/composables/useClipboard'
import { validateContactForm } from '~/utils/contact-form'

interface Props {
  email?: string
}

const props = withDefaults(defineProps<Props>(), {
  email: 'ajbareaa@gmail.com'
})

const toast = useToast()
const clipboard = useClipboard()
const { t } = useI18n()

const form = ref({
  email: '',
  message: ''
})

const errors = ref<{ email?: string; message?: string }>({})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const emailInput = ref<HTMLInputElement | null>(null)
const messageInput = ref<HTMLTextAreaElement | null>(null)

const WEB3FORMS_ACCESS_KEY = useRuntimeConfig().public.web3formsKey || ''

async function copyEmailFallback() {
  await clipboard.copy(props.email, t('contactForm.copyEmailFallback', { email: props.email }))
}

async function handleSubmit() {
  if (isSubmitting.value) return

  // Validate on submit — the button stays enabled (disabling-until-valid is an
  // a11y anti-pattern). On error, the role="alert" messages announce and we
  // move focus to the first invalid field ("error alert, then focus").
  errors.value = validateContactForm(form.value, {
    messageRequired: t('contactForm.errorMessageRequired'),
    emailInvalid: t('contactForm.errorEmailInvalid')
  })
  if (errors.value.email || errors.value.message) {
    await nextTick()
    if (errors.value.email) emailInput.value?.focus()
    else messageInput.value?.focus()
    return
  }

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
      toast.success(t('contactForm.toastSuccess'))
      form.value = { email: '', message: '' }
      errors.value = {}

      setTimeout(() => {
        isSuccess.value = false
      }, 5000)
    } else {
      throw new Error(result.message || 'Failed to send message')
    }
  } catch (error) {
    toast.error(t('contactForm.toastError'))
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
    <form v-if="!isSuccess" class="space-y-4" novalidate @submit.prevent="handleSubmit">
      <div>
        <label
          for="contact-email"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {{ $t('contactForm.emailLabel') }}
          <span class="text-gray-500 dark:text-gray-400">{{
            $t('contactForm.emailOptional')
          }}</span>
        </label>
        <input
          id="contact-email"
          ref="emailInput"
          v-model="form.email"
          type="email"
          :placeholder="$t('contactForm.emailPlaceholder')"
          autocomplete="email"
          :aria-invalid="Boolean(errors.email)"
          :aria-describedby="
            errors.email ? 'contact-email-error contact-email-help' : 'contact-email-help'
          "
          :class="[
            'w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors',
            errors.email
              ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
          ]"
          @input="errors.email = undefined"
        />
        <p
          v-if="errors.email"
          id="contact-email-error"
          role="alert"
          class="mt-1 text-xs text-red-600 dark:text-red-400"
        >
          {{ errors.email }}
        </p>
        <p id="contact-email-help" class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {{ $t('contactForm.emailHelp') }}
        </p>
      </div>

      <div>
        <label
          for="contact-message"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {{ $t('contactForm.messageLabel') }}
          <span class="text-red-500" aria-hidden="true">{{
            $t('contactForm.messageRequired')
          }}</span>
        </label>
        <textarea
          id="contact-message"
          ref="messageInput"
          v-model="form.message"
          rows="4"
          required
          :placeholder="$t('contactForm.messagePlaceholder')"
          :aria-invalid="Boolean(errors.message)"
          :aria-describedby="errors.message ? 'contact-message-error' : undefined"
          :class="[
            'w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:border-transparent transition-colors resize-none',
            errors.message
              ? 'border-red-500 dark:border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
          ]"
          @input="errors.message = undefined"
        />
        <p
          v-if="errors.message"
          id="contact-message-error"
          role="alert"
          class="mt-1 text-xs text-red-600 dark:text-red-400"
        >
          {{ errors.message }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-70 disabled:cursor-wait text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      >
        <svg
          v-if="isSubmitting"
          class="w-5 h-5 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
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
        <svg
          v-else
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
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <span>{{ isSubmitting ? $t('contactForm.sending') : $t('contactForm.sendMessage') }}</span>
      </button>
    </form>

    <!-- Success state -->
    <div v-else class="text-center py-8" role="status">
      <div
        class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
      >
        <svg
          class="w-8 h-8 text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {{ $t('contactForm.successHeading') }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        {{ $t('contactForm.successBody') }}
      </p>
    </div>

    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
          {{ $t('contactForm.divider') }}
        </span>
      </div>
    </div>

    <button
      type="button"
      class="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500"
      @click="copyEmail"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
      <span class="font-medium">{{ email }}</span>
      <span class="text-gray-500 dark:text-gray-400 text-sm">{{
        $t('contactForm.clickToCopy')
      }}</span>
    </button>
  </div>
</template>
