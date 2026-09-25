import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { signPkcs1Sha256 } from '../../signPkcs1Sha256'
import { parseCertificateChain } from '../parsers/parseCertificateChain'
import { assertSignatureVerifies } from './assertSignatureVerifies'

describe('assertSignatureVerifies', () => {
  const identity = buildTestIdentity()
  const { signer } = parseCertificateChain(identity.cert)
  const data = Buffer.from('signed info')
  it('accepts a signature made with the certificate key', () => {
    expect(() => {
      assertSignatureVerifies(signer, data, signPkcs1Sha256(identity, data))
    }).not.toThrow()
  })
  it('refuses a signature made with another key', () => {
    const other = buildTestIdentity()
    expect(() => {
      assertSignatureVerifies(signer, data, signPkcs1Sha256(other, data))
    }).toThrow('does not match the signing certificate')
  })
})
