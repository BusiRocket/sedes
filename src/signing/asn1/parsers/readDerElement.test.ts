import { describe, expect, it } from 'vitest'

import { derOctetString } from '../derOctetString'
import { readDerElement } from './readDerElement'

describe('readDerElement', () => {
  it('reads short and long form lengths', () => {
    expect(readDerElement(Buffer.from([4, 2, 1, 2]), 0)).toEqual({
      tag: 4,
      start: 0,
      valueStart: 2,
      end: 4,
    })
    const long = derOctetString(Buffer.alloc(300))
    expect(readDerElement(long, 0)).toMatchObject({ valueStart: 4, end: 304 })
  })

  it('refuses truncated data', () => {
    expect(() => readDerElement(Buffer.from([4, 5, 1]), 0)).toThrow()
    expect(() => readDerElement(Buffer.from([4]), 0)).toThrow()
  })
})
