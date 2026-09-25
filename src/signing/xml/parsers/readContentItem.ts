import type { XmlContentItem } from '../types/XmlContentItem'
import type { XmlCursor } from '../types/XmlCursor'
import { expectLiteral } from './expectLiteral'
import { readCharData } from './readCharData'
import { readComment } from './readComment'
import { readDelimited } from './readDelimited'
import { readName } from './readName'
import { readProcessingInstruction } from './readProcessingInstruction'
import { readStartTag } from './readStartTag'
import { skipWhitespace } from './skipWhitespace'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read the next token of element content. */
export const readContentItem = (cursor: XmlCursor): XmlContentItem => {
  const ahead = (literal: string): boolean =>
    cursor.text.startsWith(literal, cursor.position)
  if (cursor.position >= cursor.text.length)
    throw xmlSyntaxError(cursor, 'unexpected end of document')
  if (ahead('</')) {
    cursor.position += 2
    const name = readName(cursor)
    skipWhitespace(cursor)
    expectLiteral(cursor, '>')
    return { type: 'end', name }
  }
  if (ahead('<!--')) return { type: 'node', node: readComment(cursor) }
  if (ahead('<![CDATA['))
    return {
      type: 'node',
      node: { kind: 'text', value: readDelimited(cursor, '<![CDATA[', ']]>') },
    }
  if (ahead('<?'))
    return { type: 'node', node: readProcessingInstruction(cursor) }
  if (ahead('<!')) throw xmlSyntaxError(cursor, 'declaration inside content')
  if (ahead('<')) return readStartTag(cursor)
  return { type: 'node', node: { kind: 'text', value: readCharData(cursor) } }
}
