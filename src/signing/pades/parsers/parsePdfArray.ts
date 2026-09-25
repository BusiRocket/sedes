import type { PdfCursor } from '../types/PdfCursor'
import type { PdfValue } from '../types/PdfValue'
import type { PdfValueParser } from '../types/PdfValueParser'
import { readPdfLexeme } from './readPdfLexeme'

/** Parse the items of an array whose `[` was already read, up to its `]`. */
export const parsePdfArray = (
  cursor: PdfCursor,
  parseValue: PdfValueParser,
): PdfValue => {
  const items: PdfValue[] = []
  for (;;) {
    const saved = cursor.pos
    const lexeme = readPdfLexeme(cursor)
    if (lexeme === ']') return { kind: 'array', items }
    if (lexeme === undefined) throw new Error('unterminated PDF array')
    cursor.pos = saved
    items.push(parseValue(cursor))
  }
}
