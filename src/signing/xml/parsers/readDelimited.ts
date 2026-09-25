import type { XmlCursor } from '../types/XmlCursor'
import { expectLiteral } from './expectLiteral'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read the raw text between `open` and `close` (comments, CDATA, PIs). */
export const readDelimited = (
  cursor: XmlCursor,
  open: string,
  close: string,
): string => {
  expectLiteral(cursor, open)
  const end = cursor.text.indexOf(close, cursor.position)
  if (end === -1) throw xmlSyntaxError(cursor, `missing "${close}"`)
  const body = cursor.text.slice(cursor.position, end)
  cursor.position = end + close.length
  return body
}
