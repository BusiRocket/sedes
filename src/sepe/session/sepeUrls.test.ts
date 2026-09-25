import { describe, expect, it } from 'vitest'

import { sepeUrls } from './sepeUrls'

describe('sepeUrls', () => {
  it('encodes the service URL as GAURI and names the Cl@ve proxy as IdP', () => {
    const url = sepeUrls.ssoInit('https://sede.sepe.gob.es/x/y.do')

    expect(
      url.startsWith('https://isweb.sepe.gob.es/GetAccess/Saml/SSO/Init?'),
    ).toBe(true)
    expect(url).toContain('GAURI=https%3A%2F%2Fsede.sepe.gob.es%2Fx%2Fy.do')
    expect(url).toContain(
      'GA_SAML_IDP=https%3A%2F%2Fpasarela.clave.gob.es%2FProxy2',
    )
    expect(url).toContain('GA_SAML_PROVIDER=Q2819009H_E00142804')
  })
})
