<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="contact" class="py-12" aria-labelledby="contact-heading">
    <div class="text-center mb-8">
      <h2
        id="contact-heading"
        class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
      >
        Get In Touch
      </h2>
      <p class="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Have a question or want to work together? Send me a message and I'll get back to you.
      </p>
    </div>

    <div
      class="bg-white dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8"
    >
      <UiContactForm :email="profile.contact.email" />
    </div>
  </section>
</template>
