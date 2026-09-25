import { describe, expect, it } from 'vitest'

import { mapLatin1FormBody } from './mapLatin1FormBody'

describe('mapLatin1FormBody', () => {
  it('encodes ó as the single byte F3, spaces as + and reserved bytes as %XX', () => {
    expect(mapLatin1FormBody({ tipo: 'De situación', opcion: 'a&b=c' })).toBe(
      'tipo=De+situaci%F3n&opcion=a%26b%3Dc',
    )
  })

  it('replaces characters outside Latin-1 with ? and keeps unreserved ones', () => {
    expect(mapLatin1FormBody({ 'a.b-c_d~': '€x' })).toBe('a.b-c_d~=%3Fx')
  })
})
