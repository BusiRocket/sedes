import { rootCertificates } from 'node:tls'

import { describe, expect, it } from 'vitest'

import { fnmtServerRootCertificate } from './fnmtServerRootCertificate'
import { trustedCertificateAuthorities } from './trustedCertificateAuthorities'

describe('trustedCertificateAuthorities', () => {
  it("keeps Node's roots and adds the FNMT server root", () => {
    expect(trustedCertificateAuthorities).toHaveLength(
      rootCertificates.length + 1,
    )
    expect(trustedCertificateAuthorities).toContain(fnmtServerRootCertificate)
    expect(fnmtServerRootCertificate).toMatch(/^-----BEGIN CERTIFICATE-----/)
  })
})
