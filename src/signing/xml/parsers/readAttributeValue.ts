import type { XmlCursor } from '../types/XmlCursor'
import { readReference } from './readReference'
import { xmlSyntaxError } from './xmlSyntaxError'

/**
 * Read a quoted attribute value with XML attribute-value normalisation:
 * literal whitespace becomes a space, references are decoded verbatim.
 */
export const readAttributeValue = (cursor: XmlCursor): string => {
  const quote = cursor.text.charAt(cursor.position)
  if (quote !== '"' && quote !== "'")
    throw xmlSyntaxError(cursor, 'expected a quoted value')
  cursor.position += 1
  let value = ''
  for (;;) {
    const character = cursor.text.charAt(cursor.position)
    if (character === '') throw xmlSyntaxError(cursor, 'unterminated value')
    if (character === quote) break
    if (character === '<') throw xmlSyntaxError(cursor, '"<" in a value')
    if (character === '&') {
      value += readReference(cursor)
      continue
    }
    value += /[\t\n]/.test(character) ? ' ' : character
    cursor.position += 1
  }
  cursor.position += 1
  return value
}
