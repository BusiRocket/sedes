import { describe, expect, it } from 'vitest'

import { cookieDomainAccepted } from './cookieDomainAccepted'

const clave = 'pasarela.clave.gob.es'
const bde = 'aps.bde.es'

describe('cookieDomainAccepted', () => {
  it('accepts the host itself and its parents below a public suffix', () => {
    expect(cookieDomainAccepted(clave, 'clave.gob.es')).toBe(true)
    expect(cookieDomainAccepted(bde, bde)).toBe(true)
  })

  it('refuses public suffixes, bare labels and unrelated domains', () => {
    expect(cookieDomainAccepted(clave, 'gob.es')).toBe(false)
    expect(cookieDomainAccepted(bde, 'es')).toBe(false)
    expect(cookieDomainAccepted('localhost', 'localhost')).toBe(false)
    expect(cookieDomainAccepted(bde, 'seg-social.es')).toBe(false)
    expect(cookieDomainAccepted('xbde.es', 'bde.es')).toBe(false)
  })
})
