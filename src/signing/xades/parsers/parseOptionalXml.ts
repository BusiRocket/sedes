import { parseXmlDocument } from '../../xml/parsers/parseXmlDocument'
import type { XmlDocument } from '../../xml/types/XmlDocument'

/** The content as an XML document, or undefined when it is not well-formed XML. */
export const parseOptionalXml = (content: Buffer): XmlDocument | undefined => {
  try {
    return parseXmlDocument(content)
  } catch {
    return undefined
  }
}
