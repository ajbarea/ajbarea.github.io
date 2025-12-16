<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { GalleryImage } from '~/types'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipeDynamicCaption from 'photoswipe-dynamic-caption-plugin'
import 'photoswipe/style.css'
import 'photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css'

interface Props {
  images: GalleryImage[]
  galleryId?: string
}

const props = withDefaults(defineProps<Props>(), {
  galleryId: 'photo-gallery',
})

const emit = defineEmits<{
  imageLoad: [id: string]
  imageError: [id: string]
}>()

let lightbox: PhotoSwipeLightbox | null = null
const loadedImages = ref<Set<string>>(new Set())
const errorImages = ref<Set<string>>(new Set())

// Track which images are loaded for skeleton display
const isImageLoaded = (id: string) => loadedImages.value.has(id)
const hasImageError = (id: string) => errorImages.value.has(id)

const handleImageLoad = (id: string) => {
  loadedImages.value.add(id)
  emit('imageLoad', id)
}

const handleImageError = (id: string, event: Event) => {
  errorImages.value.add(id)
  // Set fallback placeholder
  const img = event.target as HTMLImageElement
  img.src = '/images/placeholder.svg'
  emit('imageError', id)
}

onMounted(() => {
  // Initialize PhotoSwipe lightbox
  lightbox = new PhotoSwipeLightbox({
    gallery: `#${props.galleryId}`,
    children: 'a',
    pswpModule: () => import('photoswipe'),
    // Enable keyboard navigation
    wheelToZoom: true,
    // Accessibility options
    closeTitle: 'Close (Esc)',
    zoomTitle: 'Zoom',
    arrowPrevTitle: 'Previous (Arrow Left)',
    arrowNextTitle: 'Next (Arrow Right)',
    // Padding for caption space
    paddingFn: () => ({ top: 30, bottom: 30, left: 70, right: 70 }),
  })

  // Fallback: use domItemData filter for any images without predefined dimensions
  lightbox.addFilter('domItemData', (itemData, element, linkEl) => {
    if (!itemData.width || !itemData.height) {
      const img = linkEl.querySelector('img')
      if (img && img.complete && img.naturalWidth > 0) {
        itemData.width = img.naturalWidth
        itemData.height = img.naturalHeight
      }
    }
    return itemData
  })

  // Initialize dynamic caption plugin
  new PhotoSwipeDynamicCaption(lightbox, {
    type: 'auto',
    captionContent: (slide: { data: { element?: HTMLElement } }) => {
      const el = slide.data.element
      if (el) {
        const caption = el.getAttribute('data-pswp-caption')
        return caption || ''
      }
      return ''
    },
  })

  lightbox.init()
})

onUnmounted(() => {
  if (lightbox) {
    lightbox.destroy()
    lightbox = null
  }
})
</script>

<template>
  <div
    :id="galleryId"
    class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
    role="list"
    aria-label="Photo gallery - click any image to view full size"
  >
    <figure
      v-for="image in images"
      :key="image.id"
      class="break-inside-avoid mb-3 sm:mb-4"
      role="listitem"
    >
      <a
        :href="image.fullUrl"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        :data-pswp-caption="image.caption || image.alt"
        target="_blank"
        rel="noreferrer"
        class="block relative overflow-hidden rounded-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 min-h-[44px]"
        :aria-label="`View full size: ${image.alt}`"
      >
        <!-- Skeleton placeholder -->
        <div
          v-if="!isImageLoaded(image.id) && !hasImageError(image.id)"
          class="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
          :style="{ aspectRatio: `${image.width}/${image.height}` }"
          aria-hidden="true"
        />

        <!-- Thumbnail image with lazy loading -->
        <img
          :src="image.thumbnailUrl"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          loading="lazy"
          class="w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
          :class="{ 'opacity-0': !isImageLoaded(image.id) && !hasImageError(image.id) }"
          @load="handleImageLoad(image.id)"
          @error="handleImageError(image.id, $event)"
        />

        <!-- Hover overlay -->
        <div
          class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg"
          aria-hidden="true"
        />
      </a>
    </figure>
  </div>
</template>
