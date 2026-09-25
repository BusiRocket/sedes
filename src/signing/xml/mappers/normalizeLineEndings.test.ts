import { describe, expect, it } from 'vitest'

import { normalizeLineEndings } from './normalizeLineEndings'

describe('normalizeLineEndings', () => {
  it('turns CRLF and lone CR into LF', () => {
    expect(normalizeLineEndings('a\r\nb\rc\n')).toBe('a\nb\nc\n')
  })
})
