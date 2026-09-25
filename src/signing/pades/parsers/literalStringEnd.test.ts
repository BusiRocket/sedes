import { describe, expect, it } from 'vitest'

import { literalStringEnd } from './literalStringEnd'

describe('literalStringEnd', () => {
  it('honours nesting and escapes', () => {
    expect(literalStringEnd('(a (b) \\) c) rest', 0)).toBe(12)
  })

  it('refuses an unterminated string', () => {
    expect(() => literalStringEnd('(open', 0)).toThrow(/unterminated/)
  })
})
