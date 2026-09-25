import { describe, expect, it } from 'vitest'

import type { DebtRow } from '../../debts/types/DebtRow'
import { letterBlockers } from './letterBlockers'

const debt: DebtRow = {
  clave: 'A0000000000000001',
  concepto: 'IRPF',
  pendiente: { text: '1.000,00', amount: 1000 },
}
const context = { debts: [debt], pendingNotifications: 0, puv: 'AB' }
const request = {
  nif: '00000000T',
  clave: 'A0000000000000001',
  importe: '100,00',
  confirm: false,
}

describe('letterBlockers', () => {
  it('passes a valid partial amount', () => {
    expect(letterBlockers(context, request, debt)).toEqual([])
  })

  it('blocks on pending notifications and an unknown clave', () => {
    const blockers = letterBlockers(
      { ...context, pendingNotifications: 2 },
      request,
      undefined,
    )
    expect(blockers).toHaveLength(2)
    expect(blockers[0]).toMatch(/comparecer/)
    expect(blockers[1]).toMatch(/not in the debt list/)
  })

  it('blocks a missing token, a malformed amount or one above the debt', () => {
    expect(
      letterBlockers({ ...context, puv: undefined }, request, debt)[0],
    ).toMatch(/pUV/)
    expect(
      letterBlockers(context, { ...request, importe: '100' }, debt)[0],
    ).toMatch(/not an n,nn/)
    expect(
      letterBlockers(context, { ...request, importe: '1.000,01' }, debt)[0],
    ).toMatch(/at most/)
    expect(
      letterBlockers(context, { ...request, importe: '0,00' }, debt)[0],
    ).toMatch(/above 0/)
  })
})
