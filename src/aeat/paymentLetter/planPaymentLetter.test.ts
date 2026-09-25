import { describe, expect, it } from 'vitest'

import type { DebtRow } from '../debts/types/DebtRow'
import { planPaymentLetter } from './planPaymentLetter'

const debt: DebtRow = {
  clave: 'A0000000000000001',
  concepto: 'IRPF',
  pendiente: { text: '1.000,00', amount: 1000 },
  situacion: 'Embargo de cuentas',
}
const request = {
  nif: '00000000T',
  clave: 'A0000000000000001',
  importe: '100,00',
  confirm: false,
}

describe('planPaymentLetter', () => {
  it('is ready and warns about the embargo', () => {
    const outcome = planPaymentLetter(
      { debts: [debt], pendingNotifications: 0, puv: 'AB' },
      { ...request, outDir: '/tmp/o' },
    )
    expect(outcome.ready).toBe(true)
    expect(outcome.debt).toBe(debt)
    expect(outcome.notes[0]).toMatch(/same day/)
    expect(outcome.plan.join(' ')).toMatch(/Nothing is charged/)
    expect(outcome.plan[3]).toMatch(/save the carta/)
  })

  it('is not ready when blocked and says the PDF is skipped without --out', () => {
    const outcome = planPaymentLetter(
      { debts: [], pendingNotifications: 0, puv: 'AB' },
      request,
    )
    expect(outcome.ready).toBe(false)
    expect(outcome.debt).toBeUndefined()
    expect(outcome.plan[3]).toMatch(/Without --out/)
  })
})
