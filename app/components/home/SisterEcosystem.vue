<script setup lang="ts">
import { sisters } from '~/data/sisters'
</script>

<template>
  <section aria-labelledby="sisters-heading" class="mb-12">
    <h2
      id="sisters-heading"
      class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
    >
      {{ $t('sections.sisters') }}
    </h2>
    <p class="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
      {{ $t('sisters.lead') }}
    </p>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      role="list"
      :aria-label="$t('sisters.listAria')"
    >
      <li
        v-for="sister in sisters"
        :key="sister.id"
        class="relative flex h-full flex-col list-none bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200"
      >
        <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1">
          <a
            :href="sister.url"
            target="_blank"
            rel="noopener noreferrer"
            class="after:absolute after:inset-0 after:rounded-lg focus:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary-500 focus-visible:after:ring-offset-2 dark:focus-visible:after:ring-offset-gray-900"
          >
            {{ $t('sisters.items.' + sister.id + '.name') }}
            <span class="sr-only">{{ $t('sisters.opensOnGitHub') }}</span>
          </a>
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          {{ $t('sisters.items.' + sister.id + '.description') }}
        </p>
      </li>
    </ul>
  </section>
</template>
