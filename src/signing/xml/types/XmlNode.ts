import type { XmlComment } from './XmlComment'
import type { XmlElement } from './XmlElement'
import type { XmlProcessingInstruction } from './XmlProcessingInstruction'
import type { XmlText } from './XmlText'

/** Any node that can sit inside an element. */
export type XmlNode =
  XmlElement | XmlText | XmlComment | XmlProcessingInstruction
