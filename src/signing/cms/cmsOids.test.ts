import { describe, expect, it } from 'vitest'

import { cmsOids } from './cmsOids'

describe('cmsOids', () => {
  it('names the PAdES identifiers', () => {
    expect(cmsOids.signedData).toBe('1.2.840.113549.1.7.2')
    expect(cmsOids.signingCertificateV2).toBe('1.2.840.113549.1.9.16.2.47')
  })
})
