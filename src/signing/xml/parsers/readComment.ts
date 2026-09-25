import type { XmlComment } from '../types/XmlComment'
import type { XmlCursor } from '../types/XmlCursor'
import { readDelimited } from './readDelimited'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read a `<!-- ... -->` comment. */
export const readComment = (cursor: XmlCursor): XmlComment => {
  const value = readDelimited(cursor, '<!--', '-->')
  if (value.includes('--') || value.endsWith('-'))
    throw xmlSyntaxError(cursor, '"--" inside a comment')
  return { kind: 'comment', value }
}
