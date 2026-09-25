import { describe, expect, it } from 'vitest'

import { readCompressedObject } from './readCompressedObject'

describe('readCompressedObject', () => {
  const data = Buffer.from('5 0 6 4 true [1]')

  it('reads the object at its header offset', () => {
    expect(readCompressedObject(data, 8, 0)).toEqual({
      kind: 'raw',
      text: 'true',
    })
    expect(readCompressedObject(data, 8, 1)).toMatchObject({ kind: 'array' })
  })

  it('refuses an index past the header', () => {
    expect(() => readCompressedObject(Buffer.from(''), 0, 0)).toThrow(
      /out of range/,
    )
  })
})
