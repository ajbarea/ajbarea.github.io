// Pure validator for the contact form. Kept free of Vue/Nuxt so the component
// and Vitest share it; it takes the i18n-resolved error strings as input
// rather than calling useI18n(). Message is required; email is optional but
// must be a valid address if provided. Powers "validate on submit" — the
// submit button stays enabled (disabling-until-valid is the a11y anti-pattern).
export interface ContactFormValues {
  email: string
  message: string
}

export interface ContactFormErrors {
  email?: string
  message?: string
}

export interface ContactFormErrorMessages {
  messageRequired: string
  emailInvalid: string
}

// Pragmatic email shape check (x@y.z): rejects obvious garbage without chasing
// RFC-5322 completeness, which over-rejects valid addresses in practice.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(
  values: ContactFormValues,
  messages: ContactFormErrorMessages
): ContactFormErrors {
  const errors: ContactFormErrors = {}
  if (!values.message.trim()) {
    errors.message = messages.messageRequired
  }
  const email = values.email.trim()
  if (email && !EMAIL_RE.test(email)) {
    errors.email = messages.emailInvalid
  }
  return errors
}
