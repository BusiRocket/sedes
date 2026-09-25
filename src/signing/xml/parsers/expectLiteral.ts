import type { XmlCursor } from '../types/XmlCursor'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Consume `literal` or fail. */
export const expectLiteral = (cursor: XmlCursor, literal: string): void => {
  if (!cursor.text.startsWith(literal, cursor.position))
    throw xmlSyntaxError(cursor, `expected "${literal}"`)
  cursor.position += literal.length
}
