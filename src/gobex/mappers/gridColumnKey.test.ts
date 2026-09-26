import { describe, expect, it } from 'vitest'

import { gridColumnKey } from './gridColumnKey'

describe('gridColumnKey', () => {
  it('names known columns and camel-cases the rest', () => {
    expect(gridColumnKey('Nº. carta de pago')).toBe('paymentLetter')
    expect(gridColumnKey('Imp. líquido')).toBe('netAmount')
    expect(gridColumnKey('Órgano gestor del pago')).toBe('organoGestorDelPago')
  })
})
