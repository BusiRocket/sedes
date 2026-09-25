import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { buildTestSignatureContext } from '../fixtures/buildTestSignatureContext'
import { renderTestElement } from '../fixtures/renderTestElement'
import { parseCertificateChain } from '../parsers/parseCertificateChain'
import { buildKeyInfo } from './buildKeyInfo'

const twoCertificates = parseCertificateChain(
  Buffer.concat([buildTestIdentity('A').cert, buildTestIdentity('B').cert]),
)

describe('buildKeyInfo', () => {
  it('carries the whole chain by default', () => {
    const rendered = renderTestElement(
      buildKeyInfo(
        buildTestSignatureContext({ certificates: twoCertificates }),
      ),
    )
    expect(rendered.match(/<ds:X509Certificate>/g)).toHaveLength(2)
    expect(rendered).toMatch(/^<ds:KeyInfo Id="S-KeyInfo"><ds:X509Data>/)
    expect(rendered).not.toContain('KeyValue')
  })
  it('carries the signer alone and the RSA key value on request', () => {
    const rendered = renderTestElement(
      buildKeyInfo(
        buildTestSignatureContext({
          certificates: twoCertificates,
          keyInfo: { chain: false, keyValue: true, reference: true },
        }),
      ),
    )
    expect(rendered.match(/<ds:X509Certificate>/g)).toHaveLength(1)
    expect(rendered).toMatch(
      /<ds:KeyValue><ds:RSAKeyValue><ds:Modulus>[\w+/=]+<\/ds:Modulus><ds:Exponent>AQAB<\/ds:Exponent>/,
    )
  })
})
