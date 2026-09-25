import { describe, expect, it } from 'vitest'

import { debtReportFileName } from './debtReportFileName'

describe('debtReportFileName', () => {
  it('names the detailed report after the holder alone', () => {
    expect(debtReportFileName('detallado', '12345678Z')).toBe(
      'tgss-deuda-12345678Z.pdf',
    )
  })

  it('marks the total-only report in the name', () => {
    expect(debtReportFileName('total', '12345678Z')).toBe(
      'tgss-deuda-total-12345678Z.pdf',
    )
  })
})
