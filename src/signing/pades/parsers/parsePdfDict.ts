import type { PdfCursor } from '../types/PdfCursor'
import type { PdfDict } from '../types/PdfDict'
import type { PdfValue } from '../types/PdfValue'
import type { PdfValueParser } from '../types/PdfValueParser'
import { readPdfLexeme } from './readPdfLexeme'

/** Parse the entries of a dictionary whose `<<` was already read, up to its `>>`. */
export const parsePdfDict = (
  cursor: PdfCursor,
  parseValue: PdfValueParser,
): PdfDict => {
  const entries: (readonly [string, PdfValue])[] = []
  for (;;) {
    const key = readPdfLexeme(cursor)
    if (key === '>>') return { kind: 'dict', entries }
    if (key?.startsWith('/') !== true) {
      throw new Error(`PDF dictionary key expected at ${String(cursor.pos)}`)
    }
    entries.push([key.slice(1), parseValue(cursor)])
  }
}
