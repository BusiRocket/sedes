import { canonicalizeDocument } from '../../xml/mappers/canonicalizeDocument'
import type { XmlDocument } from '../../xml/types/XmlDocument'

/** Serialise the signed document: a UTF-8 declaration and its canonical form, comments kept. */
export const formatSignedXml = (document: XmlDocument): Buffer =>
  Buffer.from(
    `<?xml version="1.0" encoding="UTF-8"?>\n${canonicalizeDocument(document, {
      withComments: true,
      exclusive: false,
    })}`,
    'utf8',
  )
