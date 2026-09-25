import { describe, expect, it } from 'vitest'

import { splitModeloField } from './splitModeloField'

describe('splitModeloField', () => {
  it('splits an autoliquidación into modelo, ejercicio and periodo', () => {
    expect(splitModeloField('130/2025/1T')).toEqual({
      modelo: '130',
      ejercicio: '2025',
      periodo: '1T',
    })
    expect(splitModeloField('100/2021/0A')).toEqual({
      modelo: '100',
      ejercicio: '2021',
      periodo: '0A',
    })
  })

  it('keeps a bare model for instalments, cartas de pago and tasas', () => {
    for (const modelo of ['002', '010', '791'])
      expect(splitModeloField(modelo)).toEqual({
        modelo,
        ejercicio: undefined,
        periodo: undefined,
      })
  })
})
