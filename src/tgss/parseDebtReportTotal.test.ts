import { describe, expect, it } from 'vitest'

import { parseDebtReportTotal } from './parseDebtReportTotal'

describe('parseDebtReportTotal', () => {
  it('reads the stated total', () => {
    const text =
      'tiene pendiente de ingreso reclamaciones de deuda ya vencidas ' +
      'con la Seguridad Social, por un importe total de 2.129,26 euros, incluyendo'
    expect(parseDebtReportTotal(text)).toEqual({
      totalExigible: '2.129,26',
      totalExigibleEuros: 2129.26,
    })
  })

  it('returns undefined when the sentence is absent', () => {
    expect(parseDebtReportTotal('no total here')).toBeUndefined()
  })
})
