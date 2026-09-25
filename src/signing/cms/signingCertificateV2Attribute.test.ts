import { createHash, X509Certificate } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { readCertificateParts } from '../asn1/parsers/readCertificateParts'
import { buildTestIdentity } from '../fixtures/buildTestIdentity'
import { signingCertificateV2Attribute } from './signingCertificateV2Attribute'

describe('signingCertificateV2Attribute', () => {
  it('carries the SHA-256 of the certificate and its issuer/serial', () => {
    const der = new X509Certificate(buildTestIdentity().cert).raw
    const parts = readCertificateParts(der)
    const attribute = signingCertificateV2Attribute(parts)
    expect(attribute.includes(createHash('sha256').update(der).digest())).toBe(
      true,
    )
    expect(
      attribute.includes(
        Buffer.concat([
          Buffer.from([0xa4]),
          Buffer.from([parts.issuer.length]),
        ]),
      ),
    ).toBe(true)
    expect(attribute.includes(parts.issuer)).toBe(true)
    expect(attribute.includes(parts.serialNumber)).toBe(true)
  })
})
