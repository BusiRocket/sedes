import { describe, expect, it } from 'vitest'

import { readXrefField } from './readXrefField'

describe('readXrefField', () => {
  it('reads big-endian fields and skips empty ones', () => {
    const data = Buffer.from([1, 0x01, 0x02, 7])
    expect(readXrefField(data, 1, 2)).toBe(0x0102)
    expect(readXrefField(data, 0, 0)).toBeUndefined()
    expect(readXrefField(data, 3, 2)).toBe(7 * 256)
  })
})
