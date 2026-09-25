import { describe, expect, it } from 'vitest'

import { byteOrZero } from './byteOrZero'

describe('byteOrZero', () => {
  it('reads inside the buffer and answers 0 outside it', () => {
    const buffer = Buffer.from([7, 8])
    expect([
      byteOrZero(buffer, 1),
      byteOrZero(buffer, -1),
      byteOrZero(buffer, 2),
    ]).toEqual([8, 0, 0])
  })
})
