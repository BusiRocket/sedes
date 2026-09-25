import type { XmlNode } from './XmlNode'
import type { XmlStartTag } from './XmlStartTag'

/** One token of element content: a start tag, an end tag, or a finished leaf node. */
export type XmlContentItem =
  | XmlStartTag
  | { readonly type: 'end'; readonly name: string }
  | { readonly type: 'node'; readonly node: XmlNode }
