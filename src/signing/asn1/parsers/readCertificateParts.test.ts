import { X509Certificate } from 'node:crypto'

import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { derInteger } from '../derInteger'
import { derNull } from '../derNull'
import { derSequence } from '../derSequence'
import { readCertificateParts } from './readCertificateParts'

describe('readCertificateParts', () => {
  it('finds the serial number and issuer of a certificate', () => {
    const der = new X509Certificate(buildTestIdentity('PARTS').cert).raw
    const parts = readCertificateParts(der)
    expect(parts.der).toEqual(der)
    expect(parts.serialNumber.toString('hex')).toBe('0203012345')
    expect(parts.issuer.toString('latin1')).toContain('PARTS')
  })

  it('refuses something that is not a certificate', () => {
    expect(() => readCertificateParts(Buffer.from([0x30, 0]))).toThrow()
  })

  it('reads a version 1 certificate, which has no [0] version field', () => {
    const name = derSequence([derNull()])
    const der = derSequence([
      derSequence([derInteger(5), derSequence([]), name]),
    ])
    const parts = readCertificateParts(der)
    expect(parts.serialNumber).toEqual(derInteger(5))
    expect(parts.issuer).toEqual(name)
  })

  it('refuses a certificate without a tbsCertificate', () => {
    expect(() => readCertificateParts(derSequence([]))).toThrow(
      /no tbsCertificate/,
    )
  })
})
