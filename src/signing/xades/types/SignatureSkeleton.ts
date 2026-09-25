import type { XmlElement } from '../../xml/types/XmlElement'
import type { XmlText } from '../../xml/types/XmlText'
import type { PendingReference } from './PendingReference'

/** A ds:Signature tree with handles on the values still to compute. */
export type SignatureSkeleton = {
  readonly signature: XmlElement
  readonly signedInfo: XmlElement
  readonly signatureValue: XmlText
  readonly references: readonly PendingReference[]
}
