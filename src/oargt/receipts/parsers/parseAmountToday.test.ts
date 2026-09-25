import { describe, expect, it } from 'vitest'

import { parseAmountToday } from './parseAmountToday'

const answer = JSON.stringify({
  data: {
    dboid: '100001069134',
    importePrincipal: 140.0,
    importeCobrado: 0.0,
    importeDescontado: 0.0,
    importeRecargo: 28.0,
    importeIntereses: 1.48,
    importeCostas: 0.0,
    importeActual: 169.48,
    importePendiente: '140.0',
    tieneImportes: 'true',
  },
  result: true,
})

describe('parseAmountToday', () => {
  it('reads the breakdown out of a CALCULAR_IMP answer', () => {
    expect(parseAmountToday(answer)).toEqual({
      principal: 140,
      surcharge: 28,
      interest: 1.48,
      costs: 0,
      total: 169.48,
      totalText: '169,48',
    })
  })

  it('answers undefined when the portal reports no result', () => {
    expect(parseAmountToday('{"result":false,"errorMessage":"x"}')).toBe(
      undefined,
    )
  })

  it('answers undefined for a result without amounts', () => {
    expect(parseAmountToday('{"result":true,"data":{}}')).toBe(undefined)
    expect(parseAmountToday('{"result":true,"data":null}')).toBe(undefined)
    expect(parseAmountToday('{"result":true}')).toBe(undefined)
  })

  it('answers undefined for anything that is not a JSON object', () => {
    expect(parseAmountToday('<zones/>')).toBe(undefined)
    expect(parseAmountToday('null')).toBe(undefined)
    expect(parseAmountToday('[]')).toEqual(undefined)
  })
})
