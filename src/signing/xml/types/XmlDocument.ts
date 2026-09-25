import type { XmlComment } from './XmlComment'
import type { XmlElement } from './XmlElement'
import type { XmlProcessingInstruction } from './XmlProcessingInstruction'

/** A parsed document: the comments and PIs around the root, and the root element. */
export type XmlDocument = {
  readonly prolog: (XmlComment | XmlProcessingInstruction)[]
  root: XmlElement
  readonly epilog: (XmlComment | XmlProcessingInstruction)[]
}
