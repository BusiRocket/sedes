import { describe, expect, it } from 'vitest'

import { selectImageButtonForm } from './selectImageButtonForm'

const base = 'https://sede.gobex.es/SEDE/privado/ciudadanos/MisPagos.jsf'

describe('selectImageButtonForm', () => {
  it('finds the form by button image and drops every other button', () => {
    const html = `<form id="menu" action="/menu"><input type="image" src="/i/bt_menu.gif" name="menu:go"/></form>
<form id="j_id137" action="/SEDE/privado/ciudadanos/MisPagos.jsf">
<input type="hidden" name="j_id137" value="j_id137"/>
<input type="button" name="j_id137:botonCertPagosTodos" value="Emitir certificado (todos)"/>
<input type="text" name="j_id137:ejercicio" value=""/>
<input type="image" src="/SEDE/imagenes/bt_buscar.gif" name="j_id137:j_id327" alt="Buscar"/>
<input type="hidden" name="javax.faces.ViewState" value="VS"/></form>`
    expect(selectImageButtonForm(html, base, 'bt_buscar')).toEqual({
      form: {
        action: base,
        fields: {
          j_id137: 'j_id137',
          'j_id137:ejercicio': '',
          'javax.faces.ViewState': 'VS',
        },
      },
      button: 'j_id137:j_id327',
    })
  })

  it('answers undefined when no form holds the button', () => {
    expect(
      selectImageButtonForm(
        '<form><input type="image" src="x.gif"/></form>',
        base,
        'bt_buscar',
      ),
    ).toBeUndefined()
  })
})
