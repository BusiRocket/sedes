import type { XmlElement } from '../../xml/types/XmlElement'
import type { XmlText } from '../../xml/types/XmlText'
import { buildElement } from './buildElement'

/** `ds:DigestMethod` and `ds:DigestValue` over the given text node. */
export const buildDigestElements = (
  ds: string,
  algorithm: string,
  value: XmlText,
): XmlElement[] => [
  buildElement(`${ds}:DigestMethod`, { Algorithm: algorithm }),
  buildElement(`${ds}:DigestValue`, {}, [value]),
]
