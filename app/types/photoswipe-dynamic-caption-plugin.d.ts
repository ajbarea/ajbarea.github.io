declare module 'photoswipe-dynamic-caption-plugin' {
  import type PhotoSwipeLightbox from 'photoswipe/lightbox'

  export interface CaptionSlide {
    data: {
      element?: HTMLElement
      caption?: string
      [key: string]: unknown
    }
  }

  export interface PhotoSwipeDynamicCaptionOptions {
    type?: 'auto' | 'below' | 'aside'
    captionContent?: (slide: CaptionSlide) => string | HTMLElement
    mobileLayoutBreakpoint?: number
    horizontalEdgeThreshold?: number
    mobileCaptionOverlapRatio?: number
  }

  export default class PhotoSwipeDynamicCaption {
    constructor(lightbox: PhotoSwipeLightbox, options?: PhotoSwipeDynamicCaptionOptions)
  }
}
