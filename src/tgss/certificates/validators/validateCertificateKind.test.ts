import { describe, expect, it } from 'vitest'

import { validateCertificateKind } from './validateCertificateKind'

describe('validateCertificateKind', () => {
  it('accepts a kind by name', () => {
    expect(validateCertificateKind('licitacion')).toBe('licitacion')
  })

  it('accepts a kind by the portal option value', () => {
    expect(validateCertificateKind('1')).toBe('generico')
    expect(validateCertificateKind('9')).toBe('subvenciones-fecha')
  })

  it('rejects a missing or unknown kind naming every accepted one', () => {
    expect(() => validateCertificateKind(undefined)).toThrow(
      /--tipo is required and must be one of generico \(1\), licitacion \(2\)/,
    )
    expect(() => validateCertificateKind('7')).toThrow(/got "7"/)
  })
})
