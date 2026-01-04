<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  galleryId: 'photo-gallery'
})

// Cloudinary base URL
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dumwa1w5x/image/upload'

/**
 * Generate Cloudinary URL with transformations
 * @param cloudinaryId - The public ID from Cloudinary
 * @param transforms - Optional transformation string (e.g., 'w_400,c_fill,q_auto,f_auto')
 */
const getCloudinaryUrl = (cloudinaryId: string, transforms?: string): string => {
  if (transforms) {
    return `${CLOUDINARY_BASE}/${transforms}/${cloudinaryId}`
  }
  return `${CLOUDINARY_BASE}/${cloudinaryId}`
}

/**
 * Get thumbnail URL with automatic optimization
 * Uses 400px width, fill crop, auto quality and format
 */
const getThumbnailUrl = (image: GalleryImage): string => {
  return getCloudinaryUrl(image.cloudinaryId, 'w_400,c_fill,q_auto,f_auto')
}

/**
 * Get full-size URL with auto quality and format
 */
const getFullUrl = (image: GalleryImage): string => {
  return getCloudinaryUrl(image.cloudinaryId, 'q_auto,f_auto')
}

const emit = defineEmits<{
  imageLoad: [id: string]
  imageError: [id: string]
}>()

/**
 * Fisher-Yates shuffle algorithm - O(n) in-place shuffle
 * Research: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * Preferred over sort(() => Math.random() - 0.5) which has O(n log n) complexity
 * and produces biased results in some JS engines
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }
  return shuffled
}

// Client-side shuffle state - triggers re-shuffle when incremented
const shuffleSeed = ref(0)

// Shuffle images on client to avoid SSR hydration mismatch
// Server renders original order, client shuffles after mount
const shuffledImages = computed(() => {
  // Dependency on shuffleSeed allows re-shuffle via incrementing seed
  void shuffleSeed.value
  return shuffleArray(props.images)
})

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
  const img = event.target as HTMLImageElement
  img.src = '/images/placeholder.svg'
  emit('imageError', id)
}

/**
 * Build HTML caption with optional location tag
 * Location displayed as muted text with pin icon below caption
 */
const buildCaptionHtml = (image: GalleryImage): string => {
  const caption = image.caption || image.alt
  if (!image.location) {
    return caption
  }

  const pinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:-1px;margin-right:4px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`

  return `<span class="pswp-caption-text">${caption}</span><span class="pswp-caption-location">${pinIcon}${image.location}</span>`
}

onMounted(() => {
  // Trigger initial shuffle on client mount
  shuffleSeed.value++

  // Initialize PhotoSwipe lightbox
  lightbox = new PhotoSwipeLightbox({
    gallery: `#${props.galleryId}`,
    children: 'a',
    pswpModule: () => import('photoswipe'),
    bgOpacity: 1,
    wheelToZoom: true,
    closeTitle: 'Close (Esc)',
    zoomTitle: 'Zoom',
    arrowPrevTitle: 'Previous (Arrow Left)',
    arrowNextTitle: 'Next (Arrow Right)',
    paddingFn: () => ({ top: 30, bottom: 30, left: 70, right: 70 })
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
    captionContent: (slide) => {
      const el = slide.data.element
      if (el) {
        const caption = el.getAttribute('data-pswp-caption')
        return caption || ''
      }
      return ''
    }
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
    class="columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
    role="list"
    aria-label="Photo gallery - click any image to view full size"
  >
    <figure
      v-for="(image, index) in shuffledImages"
      :key="image.id"
      class="gallery-item break-inside-avoid mb-3 sm:mb-4"
      role="listitem"
      :style="{ '--stagger-delay': `${Math.min(index * 30, 600)}ms` }"
    >
      <a
        :href="getFullUrl(image)"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        :data-pswp-caption="buildCaptionHtml(image)"
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

        <!-- Thumbnail image with lazy loading and staggered fade-in -->
        <img
          :src="getThumbnailUrl(image)"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          loading="lazy"
          class="gallery-image w-full h-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
          :class="{
            'opacity-0': !isImageLoaded(image.id) && !hasImageError(image.id),
            'animate-fade-in': isImageLoaded(image.id)
          }"
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

<style scoped>
/**
 * Staggered fade-in animation for gallery images
 * Research: https://gist.github.com/gregnb/a81d07c1900295df6af91b694742419
 * Uses CSS custom property for per-item delay, capped at 600ms to prevent
 * excessive wait times for images further down the page
 */
.gallery-item {
  --stagger-delay: 0ms;
}

.animate-fade-in {
  animation: fadeInUp 0.4s ease-out forwards;
  animation-delay: var(--stagger-delay);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in {
    animation: none;
    opacity: 1;
  }
}
</style>
