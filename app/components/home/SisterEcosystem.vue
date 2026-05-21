<script setup lang="ts">
import { sisters, type Sister } from '~/data/sisters'

const roleBadge: Record<Sister['role'], string> = {
  innovation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  research: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  performance: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  governance: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'lab-identity': 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
}
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
      <li v-for="sister in sisters" :key="sister.id" class="list-none">
        <a
          :href="sister.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-full flex-col bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          :aria-label="
            $t('sisters.cardAria', {
              name: $t('sisters.items.' + sister.id + '.name'),
              role: $t('sisters.roles.' + sister.role)
            })
          "
        >
          <div class="flex items-start justify-between gap-2 mb-3">
            <span
              :class="[
                'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                roleBadge[sister.role]
              ]"
            >
              {{ $t('sisters.roles.' + sister.role) }}
            </span>
          </div>
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-1">
            {{ $t('sisters.items.' + sister.id + '.name') }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            {{ $t('sisters.items.' + sister.id + '.description') }}
          </p>
        </a>
      </li>
    </ul>
  </section>
</template>
