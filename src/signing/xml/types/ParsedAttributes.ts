import type { XmlAttribute } from './XmlAttribute'

/** The attributes of a start tag and whether the tag closed itself. */
export type ParsedAttributes = {
  readonly attributes: XmlAttribute[]
  readonly selfClosing: boolean
}
