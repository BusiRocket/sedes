import type { XmlCursor } from '../types/XmlCursor'
import type { XmlProcessingInstruction } from '../types/XmlProcessingInstruction'
import { readDelimited } from './readDelimited'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read a `<?target data?>` processing instruction. */
export const readProcessingInstruction = (
  cursor: XmlCursor,
): XmlProcessingInstruction => {
  const body = readDelimited(cursor, '<?', '?>')
  const split = /\s/.exec(body)?.index ?? body.length
  const target = body.slice(0, split)
  if (target === '' || target.includes('?') || target.toLowerCase() === 'xml')
    throw xmlSyntaxError(cursor, 'invalid processing instruction')
  return { kind: 'pi', target, data: body.slice(split).trimStart() }
}
