import { describe, expect, it } from 'vitest'

import type { Receipt } from '../types/Receipt'
import { amountTodayNotes } from './amountTodayNotes'

const receipt = (reference: string, total?: number): Receipt => ({
  tab: 'ejecutiva',
  reference,
  concept: 'IVTM',
  entity: 'CACERES',
  principal: '140,00',
  pending: '140,00',
  principalNumber: 140,
  pendingNumber: 140,
  situation: 'Ejecutiva',
  directDebit: false,
  enforced: true,
  paid: false,
  amountToday:
    total === undefined
      ? undefined
      : {
          principal: 140,
          surcharge: 28,
          interest: 1.48,
          costs: 0,
          total,
          totalText: '169,48',
        },
})

describe('amountTodayNotes', () => {
  it('tells how to ask for the amounts when they were not requested', () => {
    expect(amountTodayNotes(false, [receipt('A', 169.48)])).toEqual([
      "today's amount with surcharges and interest is not listed; pass --importes to fetch it per enforced receipt",
    ])
  })

  it('says nothing when every enforced receipt got its amount', () => {
    expect(amountTodayNotes(true, [receipt('A', 169.48)])).toEqual([])
    expect(amountTodayNotes(true, [])).toEqual([])
  })

  it('names the receipts the portal left without an amount', () => {
    expect(
      amountTodayNotes(true, [
        receipt('A', 169.48),
        receipt('B'),
        receipt('C'),
      ]),
    ).toEqual([
      'the portal answered no amount today for B, C; the listed pending amount is shown instead',
    ])
  })
})
