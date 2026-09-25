import { describe, expect, it } from 'vitest'

import { parseConceptFields } from './parseConceptFields'

describe('parseConceptFields', () => {
  it('reads ejercicio, modelo and periodo from an annual concept', () => {
    expect(
      parseConceptFields('0A   2024 100 TT-IRPF - DEC.OR EJER:2024 PER:ANUAL'),
    ).toEqual({ ejercicio: '2024', modelo: '100', periodo: 'ANUAL' })
  })

  it('reads a quarterly period', () => {
    expect(
      parseConceptFields('3T   2024 130-IRPF PAGO FRA EJER:2024 PER:3T'),
    ).toEqual({ ejercicio: '2024', modelo: '130', periodo: '3T' })
  })

  it('falls back to INT and ANUAL for a late-payment interest liquidation', () => {
    expect(
      parseConceptFields('2026 LIQ INTERESES DEMORA (ART.52.4 A) R.G.R)'),
    ).toEqual({ ejercicio: undefined, modelo: 'INT', periodo: 'ANUAL' })
  })

  it('returns all-undefined fields for a concept with no recognisable shape', () => {
    expect(parseConceptFields('something else entirely')).toEqual({
      ejercicio: undefined,
      modelo: undefined,
      periodo: undefined,
    })
  })
})
