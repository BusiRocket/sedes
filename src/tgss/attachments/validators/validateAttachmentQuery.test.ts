import { describe, expect, it } from 'vitest'

import { validateAttachmentQuery } from './validateAttachmentQuery'

describe('validateAttachmentQuery', () => {
  const valid = { expediente: ' 12345 ', documento: 'a.pdf', tipo: '1008' }

  it('accepts a complete query and trims the expediente', () => {
    expect(validateAttachmentQuery(valid)).toEqual({
      expediente: '12345',
      documento: 'a.pdf',
      tipo: '1008',
    })
  })

  it.each([
    [{ ...valid, expediente: ' ' }, /--expediente is required/],
    [{ ...valid, documento: undefined }, /--documento is required/],
    [{ ...valid, tipo: '7' }, /--tipo must be 1006/],
    [{ expediente: '1', documento: 'a.pdf' }, /--tipo must be 1006/],
  ])('refuses %j', (options, message) => {
    expect(() => validateAttachmentQuery(options)).toThrow(message)
  })
})
