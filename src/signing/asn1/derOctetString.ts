import { derNode } from './derNode'

/** DER OCTET STRING. */
export const derOctetString = (content: Buffer): Buffer =>
  derNode(0x04, content)
