import { describe, expect, it } from 'vitest'

import { derOctetString } from './derOctetString'

describe('derOctetString', () => {
  it('wraps bytes under tag 0x04', () => {
    expect(derOctetString(Buffer.from([1, 2]))).toEqual(
      Buffer.from([4, 2, 1, 2]),
    )
  })
})
