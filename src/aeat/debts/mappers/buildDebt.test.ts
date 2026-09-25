import { describe, expect, it } from 'vitest'

import type { DebtRow } from '../types/DebtRow'
import { buildDebt } from './buildDebt'

const row: DebtRow = {
  clave: 'A1060012340012345',
  concepto: '0A 2024 100 TT-IRPF - DEC.OR EJER:2024 PER:ANUAL',
  pendiente: { text: '639,26', amount: 639.26 },
  aIngresar: undefined,
  periodoRecaudacion: 'Voluntario',
  situacion: 'Pendiente de pago en plazo de pago voluntario (ART.62 LGT)',
}

describe('buildDebt', () => {
  it('merges the row, its concept fields, its state and an optional detail', () => {
    expect(buildDebt(row, undefined)).toEqual({
      clave: 'A1060012340012345',
      concepto: '0A 2024 100 TT-IRPF - DEC.OR EJER:2024 PER:ANUAL',
      ejercicio: '2024',
      modelo: '100',
      periodo: 'ANUAL',
      pendiente: { text: '639,26', amount: 639.26 },
      aIngresar: undefined,
      periodoRecaudacion: 'Voluntario',
      situacion: 'Pendiente de pago en plazo de pago voluntario (ART.62 LGT)',
      estado: 'voluntaria',
      detail: undefined,
    })
  })

  it('carries the detail through untouched when one is given', () => {
    const detail = { fechaLiquidacion: '03-05-2025' }
    expect(buildDebt(row, detail).detail).toBe(detail)
  })
})
