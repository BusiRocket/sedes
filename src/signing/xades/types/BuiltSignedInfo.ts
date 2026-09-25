import type { XmlElement } from '../../xml/types/XmlElement'
import type { PendingReference } from './PendingReference'

/** A ds:SignedInfo element and the handles on its DigestValues. */
export type BuiltSignedInfo = {
  readonly element: XmlElement
  readonly references: readonly PendingReference[]
}
