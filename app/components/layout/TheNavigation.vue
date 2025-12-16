<script setup lang="ts">
import { ref } from 'vue'

import ThemeToggle from './ThemeToggle.vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  // { name: 'Gallery', path: '/gallery' },
  { name: 'Resume', path: '/resume' },
  { name: 'Blog', path: '/blog' },
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / Brand -->
        <NuxtLink
          to="/"
          class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          @click="closeMobileMenu"
        >
          <span>AJ Barea</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-1" aria-label="Primary navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="px-4 py-2.5 min-h-[44px] flex items-center rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            active-class="!text-primary-600 dark:!text-primary-400 !bg-primary-50 dark:!bg-primary-900/20"
            :exact="link.path === '/'"
          >
            {{ link.name }}
          </NuxtLink>
          <ThemeToggle class="ml-2" />
        </nav>

        <!-- Mobile Menu Button -->
        <div class="flex items-center md:hidden">
          <ThemeToggle class="mr-2" />
          <button
            type="button"
            @click="toggleMobileMenu"
            class="min-w-[44px] min-h-[44px] p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <!-- Hamburger icon -->
            <svg
              v-if="!isMobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Close icon -->
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Slide-out Drawer -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
        aria-label="Mobile navigation"
      >
        <div class="px-4 py-3 space-y-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block px-4 py-3 min-h-[44px] rounded-lg text-base font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-500"
            active-class="!text-primary-600 dark:!text-primary-400 !bg-primary-50 dark:!bg-primary-900/20"
            :exact="link.path === '/'"
            @click="closeMobileMenu"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
