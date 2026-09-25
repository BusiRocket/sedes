import { describe, expect, it } from 'vitest'

import { derOid } from './derOid'

describe('derOid', () => {
  it('encodes sha256 with base-128 arcs', () => {
    expect(derOid('2.16.840.1.101.3.4.2.1').toString('hex')).toBe(
      '0609608648016503040201',
    )
  })

  it('encodes rsaEncryption', () => {
    expect(derOid('1.2.840.113549.1.1.1').toString('hex')).toBe(
      '06092a864886f70d010101',
    )
  })
})
