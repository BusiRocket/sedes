import type { XmlDocument } from '../../xml/types/XmlDocument'
import type { XmlElement } from '../../xml/types/XmlElement'
import type { SignedContent } from '../types/SignedContent'
import type { XadesMode } from '../types/XadesMode'

/**
 * The document the signature lives in: the content's own document with the
 * signature as the root's last child when enveloped, otherwise a new document
 * whose root is the signature.
 */
export const placeSignature = (
  mode: XadesMode,
  content: SignedContent,
  signature: XmlElement,
): XmlDocument => {
  if (mode !== 'enveloped') return { prolog: [], root: signature, epilog: [] }
  if (content.document === undefined)
    throw new Error('an enveloped signature needs XML content')
  content.document.root.children.push(signature)
  return content.document
}
