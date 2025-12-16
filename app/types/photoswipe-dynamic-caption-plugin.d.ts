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

  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  export default class PhotoSwipeDynamicCaption {
    constructor(lightbox: PhotoSwipeLightbox, options?: PhotoSwipeDynamicCaptionOptions)
  }
}
