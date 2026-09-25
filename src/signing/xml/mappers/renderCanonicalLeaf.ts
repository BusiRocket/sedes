import type { CanonicalizationOptions } from '../types/CanonicalizationOptions'
import type { XmlComment } from '../types/XmlComment'
import type { XmlProcessingInstruction } from '../types/XmlProcessingInstruction'
import type { XmlText } from '../types/XmlText'
import { escapeCanonicalText } from './escapeCanonicalText'

/** Render a text, comment or processing-instruction node canonically. */
export const renderCanonicalLeaf = (
  node: XmlText | XmlComment | XmlProcessingInstruction,
  options: CanonicalizationOptions,
): string => {
  if (node.kind === 'text') return escapeCanonicalText(node.value)
  if (node.kind === 'comment')
    return options.withComments ? `<!--${node.value}-->` : ''
  return node.data === ''
    ? `<?${node.target}?>`
    : `<?${node.target} ${node.data}?>`
}
