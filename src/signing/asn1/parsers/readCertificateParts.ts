import type { CertificateParts } from '../types/CertificateParts'
import { readDerChildren } from './readDerChildren'
import { readDerElement } from './readDerElement'

/**
 * Pull the issuer and serial number out of a DER certificate:
 * Certificate = SEQUENCE { tbsCertificate SEQUENCE { [0] version OPTIONAL,
 * serialNumber, signature, issuer, ... }, ... }.
 */
export const readCertificateParts = (der: Buffer): CertificateParts => {
  const certificate = readDerElement(der, 0)
  const [tbs] = readDerChildren(der, certificate)
  if (!tbs) throw new Error('certificate has no tbsCertificate')
  const fields = readDerChildren(der, tbs)
  const versionTag = 0xa0
  const first = fields[0]?.tag === versionTag ? 1 : 0
  const serial = fields[first]
  const issuer = fields[first + 2]
  if (!serial || !issuer) throw new Error('certificate lacks serial or issuer')
  return {
    der: der.subarray(certificate.start, certificate.end),
    issuer: der.subarray(issuer.start, issuer.end),
    serialNumber: der.subarray(serial.start, serial.end),
  }
}
