import { describe, expect, it } from 'vitest'

import { xrefStreamRow } from './xrefStreamRow'

describe('xrefStreamRow', () => {
  it('encodes type 1, a 4-byte offset and a 2-byte generation', () => {
    expect([...xrefStreamRow({ num: 1, gen: 2, offset: 0x010203 })]).toEqual([
      1, 0, 1, 2, 3, 0, 2,
    ])
  })
})
