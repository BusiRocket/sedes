import { createPrivateKey, X509Certificate } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { selectSignerCertificates } from './selectSignerCertificates'

describe('selectSignerCertificates', () => {
  const holder = buildTestIdentity('HOLDER')
  const other = buildTestIdentity('CHAIN')

  it('picks the certificate of the key and keeps the rest as chain', () => {
    const bundle = Buffer.concat([other.cert, holder.cert])
    const { signer, chain } = selectSignerCertificates({
      cert: bundle,
      key: holder.key,
    })
    expect(new X509Certificate(signer).subject).toBe('CN=HOLDER')
    expect(chain.map((der) => new X509Certificate(der).subject)).toEqual([
      'CN=CHAIN',
    ])
  })

  it('refuses a bundle without the key certificate', () => {
    expect(() =>
      selectSignerCertificates({ cert: other.cert, key: holder.key }),
    ).toThrow(/matches the private key/)
  })

  it('opens a passphrase-protected key', () => {
    const encrypted = createPrivateKey(holder.key).export({
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'synthetic',
    })
    const identity = {
      cert: holder.cert,
      key: Buffer.from(encrypted),
      passphrase: 'synthetic',
    }
    expect(selectSignerCertificates(identity).chain).toEqual([])
  })
})
