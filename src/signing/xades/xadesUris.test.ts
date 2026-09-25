import { describe, expect, it } from 'vitest'

import { xadesUris } from './xadesUris'

describe('xadesUris', () => {
  it('names XAdES 1.3.2, inclusive C14N 1.0 and RSA-SHA256', () => {
    expect(xadesUris.xades).toBe('http://uri.etsi.org/01903/v1.3.2#')
    expect(xadesUris.c14n).toBe(
      'http://www.w3.org/TR/2001/REC-xml-c14n-20010315',
    )
    expect(xadesUris.rsaSha256).toBe(
      'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
    )
  })
})
