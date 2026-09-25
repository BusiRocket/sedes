import type { XmlCursor } from '../types/XmlCursor'

/** Skip XML whitespace; answer whether any was there. */
export const skipWhitespace = (cursor: XmlCursor): boolean => {
  const start = cursor.position
  while (/[ \t\n]/.test(cursor.text.charAt(cursor.position)))
    cursor.position += 1
  return cursor.position > start
}
