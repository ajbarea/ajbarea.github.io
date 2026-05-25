import { describe, it, expect } from 'vitest'
import { validateContactForm } from '../contact-form'

/**
 * Unit tests for the contact-form validator. Pure so the component and Vitest
 * share it; it takes the i18n-resolved error strings as input rather than
 * calling useI18n(). Message is required; email is optional but must be valid
 * if provided. Drives the "validate on submit" path (the submit button stays
 * enabled — disabling-until-valid is the anti-pattern we removed).
 */
const MSGS = { messageRequired: 'MSG_REQUIRED', emailInvalid: 'EMAIL_INVALID' }

describe('validateContactForm', () => {
  it('flags an empty message', () => {
    expect(validateContactForm({ email: '', message: '' }, MSGS)).toEqual({
      message: 'MSG_REQUIRED'
    })
  })

  it('flags a whitespace-only message', () => {
    expect(validateContactForm({ email: '', message: '   ' }, MSGS)).toEqual({
      message: 'MSG_REQUIRED'
    })
  })

  it('accepts a non-empty message with no email (email is optional)', () => {
    expect(validateContactForm({ email: '', message: 'Hello' }, MSGS)).toEqual({})
  })

  it('accepts a valid email alongside a message', () => {
    expect(validateContactForm({ email: 'a@b.com', message: 'Hello' }, MSGS)).toEqual({})
  })

  it('flags an invalid email when one is provided', () => {
    expect(validateContactForm({ email: 'not-an-email', message: 'Hello' }, MSGS)).toEqual({
      email: 'EMAIL_INVALID'
    })
  })

  it('does not flag a blank/whitespace email (optional)', () => {
    expect(validateContactForm({ email: '   ', message: 'Hello' }, MSGS)).toEqual({})
  })

  it('reports both errors when the message is empty and the email is invalid', () => {
    expect(validateContactForm({ email: 'bad', message: '' }, MSGS)).toEqual({
      message: 'MSG_REQUIRED',
      email: 'EMAIL_INVALID'
    })
  })
})
