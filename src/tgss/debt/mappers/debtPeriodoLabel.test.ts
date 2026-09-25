import { describe, expect, it } from 'vitest'

import { debtPeriodoLabel } from './debtPeriodoLabel'

describe('debtPeriodoLabel', () => {
  it('is the single month when the period does not span months', () => {
    expect(debtPeriodoLabel('01/2024', '01/2024')).toBe('01/2024')
  })

  it('is a range when the document spans several months', () => {
    expect(debtPeriodoLabel('06/2021', '09/2021')).toBe('06/2021-09/2021')
  })
})
