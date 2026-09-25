import { describe, expect, it } from 'vitest'

import { selectIdpChooserForm } from './selectIdpChooserForm'

const base = 'https://pasarela.clave.gob.es/'

describe('selectIdpChooserForm', () => {
  it('picks the form named idpRedirect, not the first form on the page', () => {
    const html =
      '<form action="/lang"><input type="hidden" name="lang" value="es"></form>' +
      `<form name="idpRedirect" action="${base}Proxy2/ServiceRedirect">` +
      '<input type="hidden" name="RelayState" value="rs1"></form>'
    const form = selectIdpChooserForm(html, base)
    expect(form?.action).toBe(`${base}Proxy2/ServiceRedirect`)
    expect(form?.fields).toEqual({ RelayState: 'rs1' })
  })

  it('is not fooled by a decoy id that merely contains idpRedirect', () => {
    const html =
      '<form id="idpRedirectForm" action="/wrong"><input name="x" value="y"></form>'
    expect(selectIdpChooserForm(html, base)).toBeUndefined()
  })
})
