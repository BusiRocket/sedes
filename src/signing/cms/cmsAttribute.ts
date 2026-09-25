import { derOid } from '../asn1/derOid'
import { derSequence } from '../asn1/derSequence'
import { derSetOf } from '../asn1/derSetOf'

/** CMS Attribute ::= SEQUENCE { attrType OID, attrValues SET OF value }. */
export const cmsAttribute = (oid: string, values: readonly Buffer[]): Buffer =>
  derSequence([derOid(oid), derSetOf(values)])
