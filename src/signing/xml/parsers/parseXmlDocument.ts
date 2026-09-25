import { normalizeLineEndings } from '../mappers/normalizeLineEndings'
import type { XmlCursor } from '../types/XmlCursor'
import type { XmlDocument } from '../types/XmlDocument'
import { assertNamespacesResolve } from '../validators/assertNamespacesResolve'
import { decodeXmlSource } from './decodeXmlSource'
import { readDelimited } from './readDelimited'
import { readElementTree } from './readElementTree'
import { readMisc } from './readMisc'
import { xmlSyntaxError } from './xmlSyntaxError'

/**
 * Parse a document strictly: one root, balanced tags, the five predefined
 * entities and character references only, no DTD, every prefix declared.
 */
export const parseXmlDocument = (source: Buffer | string): XmlDocument => {
  const decoded = typeof source === 'string' ? source : decodeXmlSource(source)
  const cursor: XmlCursor = { text: normalizeLineEndings(decoded), position: 0 }
  if (cursor.text.startsWith('<?xml') && /^<\?xml\s/.test(cursor.text))
    readDelimited(cursor, '<?xml', '?>')
  const prolog = readMisc(cursor)
  if (!cursor.text.startsWith('<', cursor.position))
    throw xmlSyntaxError(cursor, 'expected the root element')
  const root = readElementTree(cursor)
  const epilog = readMisc(cursor)
  if (cursor.position < cursor.text.length)
    throw xmlSyntaxError(cursor, 'content after the root element')
  assertNamespacesResolve(root)
  return { prolog, root, epilog }
}
