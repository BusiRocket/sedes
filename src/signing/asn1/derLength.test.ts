import { describe, expect, it } from 'vitest'

import { derLength } from './derLength'

describe('derLength', () => {
  it('uses the short form below 128', () => {
    expect(derLength(5)).toEqual(Buffer.from([5]))
    expect(derLength(127)).toEqual(Buffer.from([0x7f]))
  })

  it('uses the long form from 128', () => {
    expect(derLength(128)).toEqual(Buffer.from([0x81, 0x80]))
    expect(derLength(0x1234)).toEqual(Buffer.from([0x82, 0x12, 0x34]))
  })
})
