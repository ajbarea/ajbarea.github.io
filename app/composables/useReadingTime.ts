/**
 * Calculate estimated reading time for content
 * @param content - The text content to calculate reading time for
 * @returns Reading time in minutes (minimum 1 minute)
 */
export function useReadingTime(content: string): number {
  const wordsPerMinute = 200
  const trimmedContent = content.trim()

  if (trimmedContent.length === 0) {
    return 1
  }

  const words = trimmedContent.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}
