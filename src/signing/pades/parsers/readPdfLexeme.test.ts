import { describe, expect, it } from 'vitest'

import { readPdfLexeme } from './readPdfLexeme'

describe('readPdfLexeme', () => {
  it('splits the PDF syntax into lexemes', () => {
    const cursor = { text: '<< /A [1 (x y)] <AB> >> {', pos: 0 }
    const read: (string | undefined)[] = []
    for (
      let lexeme = readPdfLexeme(cursor);
      lexeme !== undefined;
      lexeme = readPdfLexeme(cursor)
    ) {
      read.push(lexeme)
    }
    expect(read).toEqual([
      '<<',
      '/A',
      '[',
      '1',
      '(x y)',
      ']',
      '<AB>',
      '>>',
      '{',
    ])
  })

  it('refuses what cannot be a lexeme', () => {
    expect(() => readPdfLexeme({ text: ')', pos: 0 })).toThrow(/unreadable/)
  })
})
