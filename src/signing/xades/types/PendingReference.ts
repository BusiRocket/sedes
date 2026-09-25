import type { XmlText } from '../../xml/types/XmlText'
import type { ReferenceTarget } from './ReferenceTarget'

/** A built ds:Reference whose DigestValue text is still to be filled. */
export type PendingReference = {
  readonly target: ReferenceTarget
  readonly digest: XmlText
}
