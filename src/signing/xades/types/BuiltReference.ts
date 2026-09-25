import type { XmlElement } from '../../xml/types/XmlElement'
import type { PendingReference } from './PendingReference'

/** A ds:Reference element and the handle on its DigestValue. */
export type BuiltReference = {
  readonly element: XmlElement
  readonly pending: PendingReference
}
