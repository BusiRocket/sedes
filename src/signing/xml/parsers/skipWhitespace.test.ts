import { describe, expect, it } from 'vitest'

import { skipWhitespace } from './skipWhitespace'

describe('skipWhitespace', () => {
  it('skips spaces, tabs and line feeds and says so', () => {
    const cursor = { text: ' \t\nx', position: 0 }
    expect(skipWhitespace(cursor)).toBe(true)
    expect(cursor.position).toBe(3)
  })
  it('answers false when there is none', () => {
    expect(skipWhitespace({ text: 'x', position: 0 })).toBe(false)
  })
})
