import { createHash } from 'node:crypto'

import { derNode } from '../asn1/derNode'
import { derOctetString } from '../asn1/derOctetString'
import { derSequence } from '../asn1/derSequence'
import type { CertificateParts } from '../asn1/types/CertificateParts'
import { cmsAttribute } from './cmsAttribute'
import { cmsOids } from './cmsOids'

/**
 * signingCertificateV2 (RFC 5035): SEQUENCE { certs SEQUENCE OF ESSCertIDv2 },
 * ESSCertIDv2 ::= SEQUENCE { certHash (SHA-256, the default algorithm, so
 * omitted), issuerSerial SEQUENCE { GeneralNames { [4] directoryName }, serial } }.
 */
export const signingCertificateV2Attribute = (
  parts: CertificateParts,
): Buffer => {
  const directoryNameTag = 4
  const certHash = createHash('sha256').update(parts.der).digest()
  const issuerSerial = derSequence([
    derSequence([derNode(0xa0 + directoryNameTag, parts.issuer)]),
    parts.serialNumber,
  ])
  const essCertId = derSequence([derOctetString(certHash), issuerSerial])
  const value = derSequence([derSequence([essCertId])])
  return cmsAttribute(cmsOids.signingCertificateV2, [value])
}
