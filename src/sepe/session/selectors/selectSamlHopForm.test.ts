import { describe, expect, it } from 'vitest'

import { selectSamlHopForm } from './selectSamlHopForm'

const base = 'https://pasarela.clave.gob.es/Proxy2/ServiceRedirect'

describe('selectSamlHopForm', () => {
  it('skips forms without a SAML field and picks the ClaveToken carrier', () => {
    const html =
      '<form action="/lang"><input name="lang" value="es"></form>' +
      '<form action="/Proxy2/ResponseRedirect"><input name="ClaveToken" value="tok"></form>'

    const form = selectSamlHopForm(html, base)

    expect(form?.action).toBe(
      'https://pasarela.clave.gob.es/Proxy2/ResponseRedirect',
    )
    expect(form?.fields).toEqual({ ClaveToken: 'tok' })
  })

  it('returns undefined on the landed service page', () => {
    expect(
      selectSamlHopForm('<form action="/x"><input name="opcion"></form>', base),
    ).toBeUndefined()
  })
})
