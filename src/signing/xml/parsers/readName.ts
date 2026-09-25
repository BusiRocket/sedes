import type { XmlCursor } from '../types/XmlCursor'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read an XML name (qualified names included) at the cursor. */
export const readName = (cursor: XmlCursor): string => {
  const pattern = /[:A-Z_a-z\u00C0-\uFFFF][-.:\w\u00B7\u00C0-\uFFFF]*/y
  pattern.lastIndex = cursor.position
  const match = pattern.exec(cursor.text)
  if (!match) throw xmlSyntaxError(cursor, 'expected a name')
  cursor.position += match[0].length
  return match[0]
}
