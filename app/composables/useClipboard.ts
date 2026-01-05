import { useToast } from './useToast'

export function useClipboard() {
  const toast = useToast()

  async function copy(text: string, successMessage = 'Copied to clipboard!') {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(successMessage)
      return true
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        document.execCommand('copy')
        toast.success(successMessage)
        return true
      } catch {
        toast.error('Failed to copy to clipboard')
        return false
      } finally {
        textArea.remove()
      }
    }
  }

  async function copyEmail(email: string) {
    return copy(email, `Email copied: ${email}`)
  }

  return {
    copy,
    copyEmail
  }
}
