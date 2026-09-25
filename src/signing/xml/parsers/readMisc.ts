import type { XmlComment } from '../types/XmlComment'
import type { XmlCursor } from '../types/XmlCursor'
import type { XmlProcessingInstruction } from '../types/XmlProcessingInstruction'
import { readComment } from './readComment'
import { readProcessingInstruction } from './readProcessingInstruction'
import { skipWhitespace } from './skipWhitespace'
import { xmlSyntaxError } from './xmlSyntaxError'

/** Read the comments, PIs and whitespace before or after the root element. */
export const readMisc = (
  cursor: XmlCursor,
): (XmlComment | XmlProcessingInstruction)[] => {
  const nodes: (XmlComment | XmlProcessingInstruction)[] = []
  for (;;) {
    skipWhitespace(cursor)
    if (cursor.text.startsWith('<!--', cursor.position))
      nodes.push(readComment(cursor))
    else if (cursor.text.startsWith('<?', cursor.position))
      nodes.push(readProcessingInstruction(cursor))
    else if (cursor.text.startsWith('<!', cursor.position))
      throw xmlSyntaxError(
        cursor,
        'document type declarations are not accepted',
      )
    else return nodes
  }
}
