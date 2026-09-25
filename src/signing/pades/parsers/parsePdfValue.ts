import type { PdfCursor } from '../types/PdfCursor'
import type { PdfValue } from '../types/PdfValue'
import { parsePdfArray } from './parsePdfArray'
import { parsePdfDict } from './parsePdfDict'
import { readPdfLexeme } from './readPdfLexeme'
import { readRefTail } from './readRefTail'

/** Parse one PDF object at the cursor. */
export const parsePdfValue = (cursor: PdfCursor): PdfValue => {
  const lexeme = readPdfLexeme(cursor)
  if (lexeme === undefined)
    throw new Error('PDF value expected, end of data found')
  if (lexeme === '<<') return parsePdfDict(cursor, parsePdfValue)
  if (lexeme === '[') return parsePdfArray(cursor, parsePdfValue)
  if (/^\d+$/.test(lexeme)) {
    const ref = readRefTail(cursor, lexeme)
    if (ref) return ref
  }
  return { kind: 'raw', text: lexeme }
}
