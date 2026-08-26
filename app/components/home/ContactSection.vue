<script setup lang="ts">
import { profile } from '~/data/profile'
import { useClipboard } from '~/composables/useClipboard'

const clipboard = useClipboard()
const links = profile.socialLinks.filter((l) => l.platform !== 'email')
</script>

<template>
  <!--
    No form here on purpose. People who reach out about research email or use
    LinkedIn; the form only added a third-party relay, a spam surface, and a
    block that read as template. The address and the profiles are the contact.
  -->
  <section id="contact" class="mb-12" aria-labelledby="contact-heading">
    <h2
      id="contact-heading"
      class="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3"
    >
      {{ $t('sections.contact') }}
    </h2>

    <p class="text-gray-600 dark:text-gray-400 mb-6">
      {{ $t('sections.contactLead') }}
    </p>

    <button
      type="button"
      class="block text-lg sm:text-2xl font-medium tracking-tight text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-5"
      @click="clipboard.copyEmail(profile.contact.email)"
    >
      {{ profile.contact.email }}
    </button>

    <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
      <a
        v-for="link in links"
        :key="link.platform"
        :href="link.url"
        :rel="link.rel || 'noopener noreferrer'"
        target="_blank"
        class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        {{ link.label }}
      </a>
    </div>
  </section>
</template>
