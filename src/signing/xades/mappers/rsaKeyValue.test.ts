import type { X509Certificate } from 'node:crypto'
import { generateKeyPairSync } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { parseCertificateChain } from '../parsers/parseCertificateChain'
import { rsaKeyValue } from './rsaKeyValue'

describe('rsaKeyValue', () => {
  it('answers the base64 modulus and exponent', () => {
    const { signer } = parseCertificateChain(buildTestIdentity().cert)
    const value = rsaKeyValue(signer)
    expect(value.exponent).toBe('AQAB')
    expect(Buffer.from(value.modulus, 'base64')).toHaveLength(256)
  })
  it('refuses a non-RSA key', () => {
    const { publicKey } = generateKeyPairSync('ec', { namedCurve: 'P-256' })
    const fake = { publicKey } as unknown as X509Certificate
    expect(() => rsaKeyValue(fake)).toThrow('only RSA certificates')
  })
})
