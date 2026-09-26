import { describe, expect, it } from 'vitest'

import { readText } from './readText'

describe('readText', () => {
  it('reads strings trimmed, numbers as text and anything else as empty', () => {
    const row = { a: ' x ', b: 2025, c: { year: 1 }, d: null }
    expect(readText(row, 'a')).toBe('x')
    expect(readText(row, 'b')).toBe('2025')
    expect(readText(row, 'c')).toBe('')
    expect(readText(row, 'missing')).toBe('')
  })
})
