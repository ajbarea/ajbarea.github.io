<script setup lang="ts">
import { useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})

function handleError(error: Error) {
  console.error('Application error:', error)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950 transition-colors duration-200">
    <LayoutTheNavigation />
    <main id="main-content" class="flex-1 px-4 sm:px-6 lg:px-8" role="main">
      <LayoutErrorBoundary
        fallback-message="We encountered an error loading this page. Please try again."
        @error="handleError"
      >
        <slot />
      </LayoutErrorBoundary>
    </main>
    <LayoutTheFooter />
    <UiToastContainer />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
}
</style>
