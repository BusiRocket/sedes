import type { XmlAttribute } from './XmlAttribute'
import type { XmlNode } from './XmlNode'

/** An element: its qualified name, its attributes in document order and its children. */
export type XmlElement = {
  readonly kind: 'element'
  readonly name: string
  readonly attributes: XmlAttribute[]
  readonly children: XmlNode[]
}
