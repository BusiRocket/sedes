import { describe, expect, it } from 'vitest'

import type { Receipt } from '../types/Receipt'
import { sumPendingAmount } from './sumPendingAmount'

const receipt = (pendingNumber: number): Receipt => ({
  tab: 'ejecutiva',
  reference: '1',
  concept: 'Tasas',
  entity: 'CACERES',
  principal: '1,00',
  pending: '1,00',
  principalNumber: 1,
  pendingNumber,
  situation: 'Ejecutiva',
  directDebit: false,
  enforced: true,
  paid: false,
})

describe('sumPendingAmount', () => {
  it('adds up the pending amount of every receipt', () => {
    expect(sumPendingAmount([receipt(10), receipt(20.5)])).toBe(30.5)
  })

  it('answers zero for an empty list', () => {
    expect(sumPendingAmount([])).toBe(0)
  })
})
