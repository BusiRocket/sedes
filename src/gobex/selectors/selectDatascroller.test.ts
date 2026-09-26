import { describe, expect, it } from 'vitest'

import { selectDatascroller } from './selectDatascroller'

const scroller = (id: string, form: string): string =>
  `new Richfaces.Datascroller('${id}', function(event){A4J.AJAX.Submit('${form}',event,{})});`

describe('selectDatascroller', () => {
  it('picks the scroller of the given form', () => {
    const html =
      scroller('panelModelo:paginasIncidencias', 'panelModelo') +
      scroller('j_id137:paginasTasasIng', 'j_id137')
    expect(selectDatascroller(html, 'j_id137')).toEqual({
      scrollerId: 'j_id137:paginasTasasIng',
      formId: 'j_id137',
    })
    expect(selectDatascroller(html, 'formulario')).toBeUndefined()
  })
})
