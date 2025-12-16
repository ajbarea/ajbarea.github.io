import { ref, onMounted, onUnmounted, computed } from 'vue'

export interface TypewriterOptions {
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

export function useTypewriter(texts: string[], options: TypewriterOptions = {}) {
  const { typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000 } = options

  const displayText = ref('')
  const currentIndex = ref(0)
  const isTyping = ref(true)
  const isDeleting = ref(false)

  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const currentFullText = computed(() => texts[currentIndex.value] || '')

  function tick() {
    if (texts.length === 0) return

    const fullText = currentFullText.value

    if (isDeleting.value) {
      // Deleting characters
      displayText.value = fullText.substring(0, displayText.value.length - 1)

      if (displayText.value.length === 0) {
        isDeleting.value = false
        currentIndex.value = (currentIndex.value + 1) % texts.length
        timeoutId = setTimeout(tick, typingSpeed)
      } else {
        timeoutId = setTimeout(tick, deletingSpeed)
      }
    } else {
      // Typing characters
      displayText.value = fullText.substring(0, displayText.value.length + 1)

      if (displayText.value === fullText) {
        // Finished typing, pause then start deleting
        isTyping.value = false
        timeoutId = setTimeout(() => {
          isDeleting.value = true
          isTyping.value = true
          tick()
        }, pauseDuration)
      } else {
        timeoutId = setTimeout(tick, typingSpeed)
      }
    }
  }

  function start() {
    if (texts.length === 0) return
    displayText.value = ''
    currentIndex.value = 0
    isTyping.value = true
    isDeleting.value = false
    tick()
  }

  function stop() {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    displayText,
    currentIndex,
    isTyping,
    isDeleting,
    start,
    stop
  }
}
