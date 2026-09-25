import type { PdfCursor } from '../types/PdfCursor'
import { literalStringEnd } from './literalStringEnd'
import { pdfLexemeEnd } from './pdfLexemeEnd'
import { skipPdfWhitespace } from './skipPdfWhitespace'

/** Read the next lexeme: `<<`, `>>`, `[`, `]`, a name, a string, a hex string or a regular run. */
export const readPdfLexeme = (cursor: PdfCursor): string | undefined => {
  skipPdfWhitespace(cursor)
  const { text } = cursor
  const start = cursor.pos
  if (start >= text.length) return undefined
  const pair = text.slice(start, start + 2)
  const char = text.charAt(start)
  let end: number
  if (pair === '<<' || pair === '>>') end = start + 2
  else if ('[]{}'.includes(char)) end = start + 1
  else if (char === '(') end = literalStringEnd(text, start)
  else if (char === '<') end = text.indexOf('>', start) + 1
  else if (char === '/') end = pdfLexemeEnd(text, start + 1)
  else end = pdfLexemeEnd(text, start)
  if (end <= start) throw new Error(`unreadable PDF lexeme at ${String(start)}`)
  cursor.pos = end
  return text.slice(start, end)
}
