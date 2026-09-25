import type { ParsedAttributes } from '../types/ParsedAttributes'
import type { XmlAttribute } from '../types/XmlAttribute'
import type { XmlCursor } from '../types/XmlCursor'
import { expectLiteral } from './expectLiteral'
import { readAttributeValue } from './readAttributeValue'
import { readName } from './readName'
import { skipWhitespace } from './skipWhitespace'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read the attributes of a start tag up to and including its `>` or `/>`. */
export const readAttributes = (cursor: XmlCursor): ParsedAttributes => {
  const attributes: XmlAttribute[] = []
  for (;;) {
    const spaced = skipWhitespace(cursor)
    if (cursor.text.startsWith('/>', cursor.position)) {
      cursor.position += 2
      return { attributes, selfClosing: true }
    }
    if (cursor.text.startsWith('>', cursor.position)) {
      cursor.position += 1
      return { attributes, selfClosing: false }
    }
    if (!spaced) throw xmlSyntaxError(cursor, 'expected whitespace')
    const name = readName(cursor)
    if (attributes.some((attribute) => attribute.name === name))
      throw xmlSyntaxError(cursor, `duplicate attribute "${name}"`)
    skipWhitespace(cursor)
    expectLiteral(cursor, '=')
    skipWhitespace(cursor)
    attributes.push({ name, value: readAttributeValue(cursor) })
  }
}
