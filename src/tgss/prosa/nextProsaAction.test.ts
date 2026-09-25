import { describe, expect, it } from 'vitest'

import { nextProsaAction } from './nextProsaAction'

describe('nextProsaAction', () => {
  it('prefers CONFIRMAR_SIT_68 when mostrarConfirmacion is S', () => {
    const xml =
      '<tipoEjecucion>O</tipoEjecucion><mostrarConfirmacion>S</mostrarConfirmacion>'
    expect(nextProsaAction(xml)).toBe('CONFIRMAR_SIT_68')
  })

  it('answers CONFIRMAR when tipoEjecucion is D', () => {
    expect(nextProsaAction('<tipoEjecucion>D</tipoEjecucion>')).toBe(
      'CONFIRMAR',
    )
  })

  it('defaults to IMPRIMIR', () => {
    expect(nextProsaAction('<tipoEjecucion>O</tipoEjecucion>')).toBe('IMPRIMIR')
  })
})
