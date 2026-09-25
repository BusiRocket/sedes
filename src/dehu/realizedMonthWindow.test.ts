import { describe, expect, it } from 'vitest'

import { realizedMonthWindow } from './realizedMonthWindow'

describe('realizedMonthWindow', () => {
  it('spans the first and last day of a 31-day month', () => {
    expect(realizedMonthWindow(2026, 1)).toEqual({
      from: '01/01/2026',
      to: '31/01/2026',
    })
  })

  it('uses 28 days for February of a non-leap year', () => {
    expect(realizedMonthWindow(2026, 2)).toEqual({
      from: '01/02/2026',
      to: '28/02/2026',
    })
  })

  it('uses 29 days for February of a leap year', () => {
    expect(realizedMonthWindow(2028, 2)).toEqual({
      from: '01/02/2028',
      to: '29/02/2028',
    })
  })

  it('spans a 30-day month', () => {
    expect(realizedMonthWindow(2026, 4)).toEqual({
      from: '01/04/2026',
      to: '30/04/2026',
    })
  })
})
