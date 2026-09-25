import { describe, expect, it } from 'vitest'

import { readReference } from './readReference'

const read = (text: string): string => readReference({ text, position: 0 })

describe('readReference', () => {
  it('decodes the predefined entities', () => {
    expect(['&lt;', '&gt;', '&amp;', '&quot;', '&apos;'].map(read)).toEqual([
      '<',
      '>',
      '&',
      '"',
      "'",
    ])
  })
  it('decodes decimal and hexadecimal character references', () => {
    expect(read('&#169;')).toBe('©')
    expect(read('&#xD;')).toBe('\r')
  })
  it('advances past the semicolon', () => {
    const cursor = { text: '&amp;x', position: 0 }
    readReference(cursor)
    expect(cursor.position).toBe(5)
  })
  it('refuses unknown entities and unterminated references', () => {
    expect(() => read('&nbsp;')).toThrow('unknown entity')
    expect(() => read('&toString;')).toThrow('unknown entity')
    expect(() => read('&amp')).toThrow('unterminated reference')
  })
})
