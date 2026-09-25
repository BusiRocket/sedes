import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { parseCertificateChain } from '../parsers/parseCertificateChain'
import { decimalSerialNumber } from './decimalSerialNumber'

describe('decimalSerialNumber', () => {
  it('turns the hexadecimal serial into decimal', () => {
    const { signer } = parseCertificateChain(buildTestIdentity().cert)
    expect(decimalSerialNumber(signer)).toBe(String(0x01_23_45))
  })
})
