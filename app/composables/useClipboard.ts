import { useToast } from './useToast'

export function useClipboard() {
  const toast = useToast()
  const { t } = useI18n()

  async function copy(text: string, successMessage?: string) {
    const successMsg = successMessage ?? t('clipboard.copied')
    const failureMsg = t('clipboard.failed')
    try {
      await navigator.clipboard.writeText(text)
      toast.success(successMsg)
      return true
    } catch {
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
        toast.success(successMsg)
        return true
      } catch {
        toast.error(failureMsg)
        return false
      } finally {
        textArea.remove()
      }
    }
  }

  async function copyEmail(email: string) {
    return copy(email, t('clipboard.emailCopied', { email }))
  }

  return {
    copy,
    copyEmail
  }
}
