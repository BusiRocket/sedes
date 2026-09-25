import { describe, expect, it } from 'vitest'

import { skipPdfWhitespace } from './skipPdfWhitespace'

describe('skipPdfWhitespace', () => {
  it('skips spaces and comments', () => {
    const cursor = { text: ' \n% note\r\n  x', pos: 0 }
    skipPdfWhitespace(cursor)
    expect(cursor.text.charAt(cursor.pos)).toBe('x')
  })

  it('reaches the end on a trailing comment', () => {
    const cursor = { text: '% only', pos: 0 }
    skipPdfWhitespace(cursor)
    expect(cursor.pos).toBe(6)
  })
})
