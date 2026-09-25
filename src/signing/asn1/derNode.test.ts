import { describe, expect, it } from 'vitest'

import { derNode } from './derNode'

describe('derNode', () => {
  it('prefixes tag and length', () => {
    expect(derNode(0x04, Buffer.from('ab'))).toEqual(
      Buffer.from([0x04, 2, 0x61, 0x62]),
    )
  })
})
