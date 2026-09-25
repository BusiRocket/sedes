import type { XmlCursor } from '../types/XmlCursor'
import type { XmlStartTag } from '../types/XmlStartTag'
import { expectLiteral } from './expectLiteral'
import { readAttributes } from './readAttributes'
import { readName } from './readName'

/** Read `<name attributes>` or `<name attributes/>`. */
export const readStartTag = (cursor: XmlCursor): XmlStartTag => {
  expectLiteral(cursor, '<')
  const name = readName(cursor)
  const { attributes, selfClosing } = readAttributes(cursor)
  return {
    type: 'start',
    element: { kind: 'element', name, attributes, children: [] },
    selfClosing,
  }
}
