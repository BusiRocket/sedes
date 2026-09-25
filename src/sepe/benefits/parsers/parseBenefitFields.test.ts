import { describe, expect, it } from 'vitest'

import { parseBenefitFields } from './parseBenefitFields'

describe('parseBenefitFields', () => {
  it('keeps only the benefit inputs, unescaped and trimmed', () => {
    const html =
      '<input type="hidden" name="org.apache.struts.taglib.html.TOKEN" value="abc">' +
      '<input name="situacion" value=" BAJA " readonly>' +
      "<input name='tipoPrestacion' value='PRESTACI&Oacute;N CONTRIBUTIVA'>" +
      '<input name="diasDerecho" value="720"><input name="diasConsumidos" value="300">' +
      '<input name="num_hijos" value="">'

    expect(parseBenefitFields(html)).toEqual({
      situacion: 'BAJA',
      tipoPrestacion: 'PRESTACIÓN CONTRIBUTIVA',
      diasDerecho: '720',
      diasConsumidos: '300',
      num_hijos: '',
    })
  })

  it('returns no fields on a page without the screen', () => {
    expect(parseBenefitFields('<p>Sin derechos</p>')).toEqual({})
  })
})
