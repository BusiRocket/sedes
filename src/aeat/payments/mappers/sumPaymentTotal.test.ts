import { describe, expect, it } from 'vitest'

import type { AeatPayment } from '../types/AeatPayment'
import { sumPaymentTotal } from './sumPaymentTotal'

const payment = (text: string, amount: number): AeatPayment => ({
  tipo: 'Liquidación',
  modelo: '002',
  justificante: '1026110000001',
  nrc: '1026110000001AAAAAAAAA',
  importe: { text, amount },
  entidad: '2100',
  fecha: '2026-01-05',
})

describe('sumPaymentTotal', () => {
  it('adds in cents so float noise never reaches the total', () => {
    expect(sumPaymentTotal([payment('0,10', 0.1), payment('0,20', 0.2)])).toBe(
      0.3,
    )
    expect(sumPaymentTotal([])).toBe(0)
  })
})
