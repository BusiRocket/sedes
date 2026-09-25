import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { parseCertificateChain } from './parseCertificateChain'

describe('parseCertificateChain', () => {
  it('reads every certificate in order, the first as signer', () => {
    const { signer, chain } = parseCertificateChain(
      Buffer.concat([buildTestIdentity('A').cert, buildTestIdentity('B').cert]),
    )
    expect(chain.map((certificate) => certificate.subject)).toEqual([
      'CN=A',
      'CN=B',
    ])
    expect(signer).toBe(chain[0])
  })
  it('refuses a bundle without certificates', () => {
    expect(() => parseCertificateChain(Buffer.from('nothing'))).toThrow(
      'no PEM certificate',
    )
  })
})
