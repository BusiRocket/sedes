import type { XmlDocument } from '../../xml/types/XmlDocument'

/** What is being signed: its bytes and, when it is XML, its tree. */
export type SignedContent = {
  readonly bytes: Buffer
  readonly document: XmlDocument | undefined
}
