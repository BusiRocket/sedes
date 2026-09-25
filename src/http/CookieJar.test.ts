import { describe, expect, it } from 'vitest'

import { CookieJar } from './CookieJar'

const tgss = 'sp.seg-social.es'

describe('CookieJar', () => {
  it('keeps host-only cookies on their host and domain cookies on the subtree', () => {
    const jar = new CookieJar()
    jar.store('pasarela.clave.gob.es', ['JSESSIONID=abc; Path=/; HttpOnly'])
    jar.store('pasarela-ident.clave.gob.es', [
      'relay=1; Domain=.clave.gob.es; Secure',
    ])
    jar.store('dehu.redsara.es', ['other=2'])
    expect(jar.headerFor('pasarela.clave.gob.es')).toBe(
      'JSESSIONID=abc; relay=1',
    )
    expect(jar.headerFor('pasarela-ident.clave.gob.es')).toBe('relay=1')
    expect(jar.headerFor('dehu.redsara.es')).toBe('other=2')
    expect(jar.headerFor('www1.agenciatributaria.gob.es')).toBeUndefined()
  })

  it('overwrites a cookie set again and ignores malformed headers', () => {
    const jar = new CookieJar()
    jar.store(tgss, ['JSESSIONID=one', 'nonsense', '=empty'])
    jar.store(tgss, ['JSESSIONID=two; Path=/; domain='])
    expect(jar.get(tgss, 'JSESSIONID')).toBe('two')
    expect(jar.get(tgss, 'nonsense')).toBeUndefined()
    expect(jar.headerFor(tgss)).toBe('JSESSIONID=two')
  })
})
