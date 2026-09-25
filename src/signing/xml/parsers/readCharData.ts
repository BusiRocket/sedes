import type { XmlCursor } from '../types/XmlCursor'
import { readReference } from './readReference'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read character data up to the next `<`, decoding references. */
export const readCharData = (cursor: XmlCursor): string => {
  let value = ''
  for (;;) {
    const character = cursor.text.charAt(cursor.position)
    if (character === '' || character === '<') return value
    if (character === '&') {
      value += readReference(cursor)
      continue
    }
    if (cursor.text.startsWith(']]>', cursor.position))
      throw xmlSyntaxError(cursor, '"]]>" in character data')
    value += character
    cursor.position += 1
  }
}
