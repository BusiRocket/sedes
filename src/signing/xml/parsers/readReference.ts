import type { XmlCursor } from '../types/XmlCursor'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Decode the entity or character reference that starts at the cursor's `&`. */
export const readReference = (cursor: XmlCursor): string => {
  const predefined: Readonly<Record<string, string>> = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '"',
    apos: "'",
  }
  const end = cursor.text.indexOf(';', cursor.position)
  if (end === -1) throw xmlSyntaxError(cursor, 'unterminated reference')
  const body = cursor.text.slice(cursor.position + 1, end)
  const numeric = /^#(?:x([0-9A-Fa-f]+)|(\d+))$/.exec(body)
  const named = Object.hasOwn(predefined, body) ? predefined[body] : undefined
  const decoded = numeric
    ? String.fromCodePoint(
        Number.parseInt(
          numeric[1] ?? numeric[2] ?? '',
          numeric[1] === undefined ? 10 : 16,
        ),
      )
    : named
  if (decoded === undefined)
    throw xmlSyntaxError(cursor, `unknown entity "&${body};"`)
  cursor.position = end + 1
  return decoded
}
