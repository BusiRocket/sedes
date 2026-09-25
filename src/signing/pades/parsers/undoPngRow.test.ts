import { describe, expect, it } from 'vitest'

import { undoPngRow } from './undoPngRow'

describe('undoPngRow', () => {
  it('adds the Sub prediction back along the row', () => {
    const out = Buffer.alloc(3)
    undoPngRow(Buffer.from([1, 5, 1, 1]), out, 0, 3)
    expect([...out]).toEqual([5, 6, 7])
  })
})
