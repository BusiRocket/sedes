import { describe, expect, it } from 'vitest'

import { validateDebtReportKind } from './validateDebtReportKind'

describe('validateDebtReportKind', () => {
  it('defaults to the detailed report', () => {
    expect(validateDebtReportKind(undefined)).toBe('detallado')
    expect(validateDebtReportKind('detallado')).toBe('detallado')
  })

  it('accepts the total-only report', () => {
    expect(validateDebtReportKind('total')).toBe('total')
  })

  it('rejects anything else', () => {
    expect(() => validateDebtReportKind('resumen')).toThrow(
      '--tipo must be detallado or total, got "resumen"',
    )
  })
})
