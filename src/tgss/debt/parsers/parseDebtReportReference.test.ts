import { describe, expect, it } from 'vitest'

import { parseDebtReportReference } from './parseDebtReportReference'

describe('parseDebtReportReference', () => {
  it('reads the verification code', () => {
    const text =
      'REFERENCIA DE VERIFICACIÓN\nCódigo: AAAAA-BBBBB-CCCCC-DDDDD-EEEEE-FFFFF                    Fecha: 25/09/2026'
    expect(parseDebtReportReference(text)).toBe(
      'AAAAA-BBBBB-CCCCC-DDDDD-EEEEE-FFFFF',
    )
  })

  it('returns undefined when there is no code', () => {
    expect(parseDebtReportReference('no reference here')).toBeUndefined()
  })
})
