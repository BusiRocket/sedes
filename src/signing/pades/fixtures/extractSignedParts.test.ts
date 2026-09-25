import { describe, expect, it } from 'vitest'

import { extractSignedParts } from './extractSignedParts'

describe('extractSignedParts', () => {
  it('splits the byte ranges and trims the placeholder zeros', () => {
    const head = 'ab/ByteRange [0 0000000051 0000000061 0000000002] x'
    const pdf = Buffer.from(`${head}<0A0B0000>zz`, 'latin1')
    expect(head.length).toBe(51)
    const parts = extractSignedParts(pdf)
    expect(parts.byteRange).toEqual([0, 51, 61, 2])
    expect(parts.cms).toEqual(Buffer.from([10, 11]))
    expect(parts.content.toString('latin1')).toBe(`${head}zz`)
  })
})
