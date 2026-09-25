import { describe, expect, it } from 'vitest'

import type { Debt } from './Debt'
import { sumDebtTotals } from './sumDebtTotals'

const debt = (pendiente: number, aIngresar?: number): Debt => ({
  clave: 'A1',
  concepto: 'x',
  pendiente: { text: String(pendiente), amount: pendiente },
  aIngresar:
    aIngresar === undefined
      ? undefined
      : { text: String(aIngresar), amount: aIngresar },
  estado: 'voluntaria',
})

describe('sumDebtTotals', () => {
  it('sums pendiente across every debt', () => {
    expect(sumDebtTotals([debt(100), debt(50)]).pendiente).toBe(150)
  })

  it('sums a ingresar only where the portal gave one, treating the rest as zero', () => {
    expect(sumDebtTotals([debt(100, 80), debt(50)]).aIngresar).toBe(80)
  })

  it('returns zero totals for an empty list', () => {
    expect(sumDebtTotals([])).toEqual({ pendiente: 0, aIngresar: 0 })
  })
})
