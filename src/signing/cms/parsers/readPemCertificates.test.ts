import { describe, expect, it } from 'vitest'

import { readPemCertificates } from './readPemCertificates'

const block = (body: string): string =>
  `-----BEGIN CERTIFICATE-----\n${body}\n-----END CERTIFICATE-----\n`

describe('readPemCertificates', () => {
  it('decodes every certificate block in order', () => {
    const pem = Buffer.from(`${block('AQI=')}junk\n${block('Aw\n==')}`)
    expect(readPemCertificates(pem)).toEqual([
      Buffer.from([1, 2]),
      Buffer.from([3]),
    ])
  })

  it('returns nothing for a PEM without certificates', () => {
    expect(
      readPemCertificates(Buffer.from('-----BEGIN PRIVATE KEY-----')),
    ).toEqual([])
  })
})
