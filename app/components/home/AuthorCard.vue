<script setup lang="ts">
import { computed, ref } from 'vue'

import type { Profile } from '~/types'
import TextScroller from './TextScroller.vue'
import { useClipboard } from '~/composables/useClipboard'

interface Props {
  profile: Profile
}

defineProps<Props>()

const { tm, rt } = useI18n()
const localePath = useLocalePath()
function resolveMessageArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => rt(item)) : []
}
const roles = computed(() => resolveMessageArray(tm('profile.roles')))
const credibilityChips = computed(() => resolveMessageArray(tm('profile.credibilityChips')))

const imageError = ref(false)
const clipboard = useClipboard()

function handleImageError() {
  imageError.value = true
}

function handleEmailClick(e: Event, email: string) {
  e.preventDefault()
  clipboard.copyEmail(email)
}

function getSocialIcon(platform: string): string {
  const icons: Record<string, string> = {
    github:
      'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z',
    linkedin:
      'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    youtube:
      'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    email:
      'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
    twitter:
      'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
  }
  return icons[platform] || ''
}
</script>

<template>
  <article class="flex flex-col md:flex-row items-center gap-6 sm:gap-8 p-4 sm:p-6 md:p-8">
    <!-- Profile Image -->
    <figure class="flex-shrink-0">
      <NuxtLink
        :to="localePath('/gallery')"
        class="block relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-primary-100 dark:ring-primary-900 shadow-xl transition-transform duration-300 hover:scale-105 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        :aria-label="$t('hero.viewGalleryAria')"
      >
        <img
          v-if="!imageError"
          :src="profile.profileImage"
          :alt="$t('hero.profileImageAlt', { name: profile.name })"
          class="w-full h-full object-cover"
          loading="lazy"
          @error="handleImageError"
        />
        <div
          v-else
          class="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center"
          role="img"
          :aria-label="$t('hero.profileInitialsAlt', { name: profile.name })"
        >
          <span class="text-4xl sm:text-5xl font-bold text-white" aria-hidden="true">
            {{
              profile.name
                .split(' ')
                .map((n) => n[0])
                .join('')
            }}
          </span>
        </div>
      </NuxtLink>
    </figure>

    <!-- Profile Info -->
    <div class="flex-1 text-center md:text-left">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {{ profile.name }}
      </h1>

      <div
        class="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 min-h-[2rem]"
        aria-live="polite"
      >
        <TextScroller :texts="roles" />
      </div>

      <ul
        v-if="credibilityChips.length > 0"
        class="flex flex-wrap justify-center md:justify-start gap-2 mb-4"
        role="list"
        :aria-label="$t('hero.credentialsAria')"
      >
        <li
          v-for="chip in credibilityChips"
          :key="chip"
          class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-1 ring-inset ring-gray-200 dark:ring-gray-700"
        >
          {{ chip }}
        </li>
      </ul>

      <p
        class="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mb-6 leading-relaxed"
      >
        {{ $t('profile.summary') }}
      </p>

      <!-- Primary + secondary CTAs -->
      <div class="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 mb-6">
        <NuxtLink
          :to="localePath('/projects')"
          class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-base font-bold shadow-sm hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          {{ $t('hero.viewProjects') }}
        </NuxtLink>
        <a
          href="/documents/AJ_Barea_Research_Resume.pdf"
          download
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-500 text-base font-bold hover:bg-primary-50 dark:hover:bg-primary-900/20 shadow-sm hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          :aria-label="$t('hero.resumeAria')"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12"
            />
          </svg>
          {{ $t('hero.resume') }}
        </a>
        <a
          href="https://ieeexplore.ieee.org/document/11366920/"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
        >
          {{ $t('hero.latestPaper') }}
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      <!-- Social Links -->
      <nav
        class="flex items-center justify-center md:justify-start gap-3 sm:gap-4"
        :aria-label="$t('hero.socialAria')"
      >
        <template v-for="link in profile.socialLinks" :key="link.platform">
          <button
            v-if="link.platform === 'email'"
            :aria-label="$t('hero.copyEmailAria')"
            class="min-w-[44px] min-h-[44px] p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 cursor-pointer"
            @click="handleEmailClick($event, profile.contact.email)"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="getSocialIcon(link.icon)" />
            </svg>
          </button>
          <a
            v-else
            :href="link.url"
            :aria-label="link.label"
            target="_blank"
            :rel="link.rel ?? 'noopener noreferrer'"
            class="min-w-[44px] min-h-[44px] p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            <UiOrcidIcon v-if="link.platform === 'orcid'" variant="mono" class="w-5 h-5" />
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path :d="getSocialIcon(link.icon)" />
            </svg>
          </a>
        </template>
      </nav>
    </div>
  </article>
</template>
