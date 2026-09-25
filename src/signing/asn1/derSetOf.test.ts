import { describe, expect, it } from 'vitest'

import { derSetOf } from './derSetOf'

describe('derSetOf', () => {
  it('sorts the encoded children (DER SET OF)', () => {
    const set = derSetOf([Buffer.from([2, 1, 9]), Buffer.from([2, 1, 1])])
    expect(set).toEqual(Buffer.from([0x31, 6, 2, 1, 1, 2, 1, 9]))
  })

  it('takes another tag for implicit sets', () => {
    expect(derSetOf([], 0xa0)).toEqual(Buffer.from([0xa0, 0]))
  })
})
