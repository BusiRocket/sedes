import type { XmlElement } from './XmlElement'

/** A start tag just read: the new element and whether it closed itself. */
export type XmlStartTag = {
  readonly type: 'start'
  readonly element: XmlElement
  readonly selfClosing: boolean
}
