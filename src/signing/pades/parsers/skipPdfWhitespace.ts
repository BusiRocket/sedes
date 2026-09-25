import type { PdfCursor } from '../types/PdfCursor'

/** Move the cursor past whitespace and `%` comments. */
export const skipPdfWhitespace = (cursor: PdfCursor): void => {
  const whitespace = '\0\t\n\f\r '
  const { text } = cursor
  while (cursor.pos < text.length) {
    const char = text.charAt(cursor.pos)
    if (whitespace.includes(char)) {
      cursor.pos += 1
    } else if (char === '%') {
      const newline = text.slice(cursor.pos).search(/[\r\n]/)
      cursor.pos = newline === -1 ? text.length : cursor.pos + newline
    } else {
      return
    }
  }
}
