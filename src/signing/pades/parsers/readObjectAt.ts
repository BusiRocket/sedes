import type { ParsedObject } from '../types/ParsedObject'
import type { PdfCursor } from '../types/PdfCursor'
import { parsePdfValue } from './parsePdfValue'
import { readPdfLexeme } from './readPdfLexeme'

/** Parse the indirect object `num gen obj ... ` that starts at `offset`. */
export const readObjectAt = (text: string, offset: number): ParsedObject => {
  const cursor: PdfCursor = { text, pos: offset }
  readPdfLexeme(cursor)
  readPdfLexeme(cursor)
  if (readPdfLexeme(cursor) !== 'obj') {
    throw new Error(`no indirect object at offset ${String(offset)}`)
  }
  const value = parsePdfValue(cursor)
  const saved = cursor.pos
  if (readPdfLexeme(cursor) !== 'stream') {
    cursor.pos = saved
    return { value, dataStart: undefined }
  }
  const eol = text.startsWith('\r\n', cursor.pos) ? 2 : 1
  return { value, dataStart: cursor.pos + eol }
}
