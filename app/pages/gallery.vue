<script setup lang="ts">
import { galleryImages } from '~/data/gallery'

useHead({
  title: 'Gallery | AJ Barea',
  meta: [
    {
      name: 'description',
      content: 'Photo gallery showcasing photography and memorable moments by AJ Barea.'
    },
    { property: 'og:title', content: 'Gallery | AJ Barea' },
    {
      property: 'og:description',
      content: 'Photo gallery showcasing photography and memorable moments by AJ Barea.'
    },
    {
      property: 'og:image',
      content: 'https://res.cloudinary.com/dumwa1w5x/image/upload/q_auto,f_auto/portfolio_ujli4t'
    },
    { property: 'og:url', content: 'https://ajbarea.github.io/gallery' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Gallery | AJ Barea' },
    {
      name: 'twitter:description',
      content: 'Photo gallery showcasing photography and memorable moments by AJ Barea.'
    }
  ]
})
</script>

<template>
  <main class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Page Header -->
      <header class="mb-8 text-center">
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Gallery</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Proof of life.</p>
      </header>

      <!-- Gallery Grid -->
      <div v-if="galleryImages.length === 0" class="text-center py-12">
        <p class="text-gray-500 dark:text-gray-400">No images available yet.</p>
      </div>

      <ClientOnly>
        <GalleryPhotoGallery
          v-if="galleryImages.length > 0"
          :images="galleryImages"
          gallery-id="main-gallery"
        />
      </ClientOnly>
    </div>
  </main>
</template>
