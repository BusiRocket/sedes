import { describe, expect, it } from 'vitest'

import { readXrefRow } from './readXrefRow'

describe('readXrefRow', () => {
  it('decodes a row by its widths', () => {
    expect(readXrefRow(Buffer.from([2, 0, 9, 3]), 0, [1, 2, 1])).toEqual({
      type: 'compressed',
      stream: 9,
      index: 3,
    })
  })

  it('reads a missing type field as type 1', () => {
    expect(readXrefRow(Buffer.from([0, 40]), 0, [0, 2, 0])).toEqual({
      type: 'offset',
      offset: 40,
    })
  })
})
