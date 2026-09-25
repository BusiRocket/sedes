import { describe, expect, it } from 'vitest'

import { selectSamlRelayForm } from './selectSamlRelayForm'

const base = 'https://pasarela-ident.clave.gob.es/'

describe('selectSamlRelayForm', () => {
  it('picks the form with an absolute action and a SAML field over decoys', () => {
    const html =
      '<form action=""><input type="hidden" name="lang" value="es"></form>' +
      '<form action="/relative"><input type="hidden" name="SAMLResponse" value="ignored"></form>' +
      `<form action="${base}IdP2/AuthenticateCitizen">` +
      '<input type="hidden" name="SAMLRequest" value="req2"></form>'
    const form = selectSamlRelayForm(html, base)
    expect(form?.action).toBe(`${base}IdP2/AuthenticateCitizen`)
    expect(form?.fields).toEqual({ SAMLRequest: 'req2' })
  })

  it('returns undefined when no form carries a SAML field', () => {
    const html =
      '<form action="/lang"><input type="hidden" name="lang" value="es"></form>'
    expect(selectSamlRelayForm(html, base)).toBeUndefined()
  })
})
