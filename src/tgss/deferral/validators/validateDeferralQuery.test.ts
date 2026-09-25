import { describe, expect, it } from 'vitest'

import { validateDeferralQuery } from './validateDeferralQuery'

describe('validateDeferralQuery', () => {
  const valid = {
    nif: ' 00000000t ',
    plazos: '24',
    garantia: 'exenta',
    documento: 'sepa.pdf',
  }

  it('accepts a complete query', () => {
    expect(validateDeferralQuery(valid)).toEqual({
      nif: '00000000T',
      plazos: 24,
      garantia: 'exenta',
      documento: 'sepa.pdf',
    })
  })

  it.each([
    [{ ...valid, nif: '' }, /--nif is required/],
    [{ ...valid, plazos: '2.5' }, /whole number/],
    [{ ...valid, plazos: undefined }, /whole number/],
    [{ ...valid, plazos: '0' }, /between 1 and 60/],
    [{ ...valid, plazos: '61' }, /between 1 and 60/],
    [{ ...valid, garantia: 'aval' }, /supports only "exenta"/],
    [{ ...valid, documento: undefined }, /--documento is required/],
  ])('refuses %j', (options, message) => {
    expect(() => validateDeferralQuery(options)).toThrow(message)
  })
})
