import { describe, expect, it } from 'vitest'

import { selectFormByName } from './selectFormByName'

const base =
  'https://sede.sepe.gob.es/DServiciosPrestanetWEB/CertificadosPrestaWeb.do'

describe('selectFormByName', () => {
  it('picks the form by its name attribute, not by document order', () => {
    const html =
      '<form name="idioma" action="/idioma.do"><input name="lang" value="es"></form>' +
      '<form name="tipoCertFormBean" method="post" action="/DServiciosPrestanetWEB/tipoCertAction.do">' +
      '<input type="hidden" name="token" value="t"></form>'

    const form = selectFormByName(html, 'tipoCertFormBean', base)

    expect(form?.action).toBe(
      'https://sede.sepe.gob.es/DServiciosPrestanetWEB/tipoCertAction.do',
    )
    expect(form?.fields).toEqual({ token: 't' })
  })

  it('does not match the name inside an input of another form', () => {
    const html =
      '<form name="other" action="/o.do"><input name="DSolicitudForm" value="x"></form>'

    expect(selectFormByName(html, 'DSolicitudForm', base)).toBeUndefined()
  })
})
