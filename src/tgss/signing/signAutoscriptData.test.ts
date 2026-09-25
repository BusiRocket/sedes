import { X509Certificate, verify } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../signing/fixtures/buildTestIdentity'
import { certificateDerBase64 } from './certificateDerBase64'
import { signAutoscriptData } from './signAutoscriptData'

describe('signAutoscriptData', () => {
  it('signs the decoded bytes with PKCS#1 SHA-256, verifiable by the certificate', () => {
    const identity = buildTestIdentity()
    const data = Buffer.from('<prepared>synthetic hash input</prepared>')
    const signature = signAutoscriptData(
      identity,
      data.toString('base64'),
      'SHA256withRSA',
    )
    const certificate = new X509Certificate(
      Buffer.from(certificateDerBase64(identity), 'base64'),
    )
    expect(
      verify(
        'sha256',
        data,
        certificate.publicKey,
        Buffer.from(signature, 'base64'),
      ),
    ).toBe(true)
  })

  it('refuses an algorithm the portal does not request', () => {
    expect(() =>
      signAutoscriptData(buildTestIdentity(), 'AA==', 'SHA1withRSA'),
    ).toThrow(/unsupported AutoScript algorithm/)
  })

  it('refuses empty data', () => {
    expect(() =>
      signAutoscriptData(buildTestIdentity(), '', 'SHA256withRSA'),
    ).toThrow(/no data to sign/)
  })
})
