import { describe, expect, it } from 'vitest'

import { parseForms } from '../../../html/parsers/parseForms'
import { mapSamlHop } from './mapSamlHop'

const current = 'https://pasarela.clave.gob.es/Proxy2/ServiceRedirect'

describe('mapSamlHop', () => {
  it('posts to the unescaped idpUrl and drops it from the fields', () => {
    const form = parseForms(
      '<form action="https://wrong.example/x">' +
        '<input name="SAMLRequest" value="req">' +
        '<input name="idpUrl" value="https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen?a=1&amp;b=2">' +
        '</form>',
      current,
    )[0] ?? { action: '', fields: {} }

    const hop = mapSamlHop(form, current)

    expect(hop.url).toBe(
      'https://pasarela-ident.clave.gob.es/IdP2/AuthenticateCitizen?a=1&b=2',
    )
    expect(hop.fields).toEqual({ SAMLRequest: 'req' })
  })

  it('falls back to the action, keeping every field, when idpUrl is absent or empty', () => {
    const form = parseForms(
      '<form action="/Proxy2/ResponseRedirect"><input name="SAMLResponse" value="r"><input name="idpUrl" value=""></form>',
      current,
    )[0] ?? { action: '', fields: {} }

    const hop = mapSamlHop(form, current)

    expect(hop.url).toBe(
      'https://pasarela.clave.gob.es/Proxy2/ResponseRedirect',
    )
    expect(hop.fields).toEqual({ SAMLResponse: 'r', idpUrl: '' })
  })
})
