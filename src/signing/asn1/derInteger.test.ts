import { describe, expect, it } from 'vitest'

import { derInteger } from './derInteger'

describe('derInteger', () => {
  it('encodes small numbers', () => {
    expect(derInteger(1)).toEqual(Buffer.from([2, 1, 1]))
    expect(derInteger(0)).toEqual(Buffer.from([2, 1, 0]))
  })

  it('pads a set high bit and strips redundant zeros', () => {
    expect(derInteger(0x80)).toEqual(Buffer.from([2, 2, 0, 0x80]))
    expect(derInteger(Buffer.from([0, 0, 0x12]))).toEqual(
      Buffer.from([2, 1, 0x12]),
    )
    expect(derInteger(Buffer.from([0, 0x92]))).toEqual(
      Buffer.from([2, 2, 0, 0x92]),
    )
  })
})
