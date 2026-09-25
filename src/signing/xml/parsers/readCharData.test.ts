import { describe, expect, it } from 'vitest'

import { readCharData } from './readCharData'

describe('readCharData', () => {
  it('reads up to "<" decoding references', () => {
    const cursor = { text: 'a &amp; b<x', position: 0 }
    expect(readCharData(cursor)).toBe('a & b')
    expect(cursor.position).toBe(9)
  })
  it('stops at the end of the text', () => {
    expect(readCharData({ text: 'tail', position: 0 })).toBe('tail')
  })
  it('refuses "]]>"', () => {
    expect(() => readCharData({ text: 'a]]>', position: 0 })).toThrow(
      '"]]>" in character data',
    )
  })
})
