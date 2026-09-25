import { describe, expect, it } from 'vitest'

import { pdfLexemeEnd } from './pdfLexemeEnd'

describe('pdfLexemeEnd', () => {
  it('stops at whitespace or a delimiter', () => {
    expect(pdfLexemeEnd('abc def', 0)).toBe(3)
    expect(pdfLexemeEnd('12/Name', 0)).toBe(2)
    expect(pdfLexemeEnd('end', 0)).toBe(3)
  })
})
