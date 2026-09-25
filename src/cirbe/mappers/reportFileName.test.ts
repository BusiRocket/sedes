import { describe, expect, it } from 'vitest'

import { reportFileName } from './reportFileName'

describe('reportFileName', () => {
  it('slugs the tipo and the reference', () => {
    expect(reportFileName('Informe Detallado', 'REF/2026 01')).toBe(
      'cirbe-informe-detallado-ref-2026-01.pdf',
    )
  })

  it('names a request without reference', () => {
    expect(reportFileName('Informe Global', '')).toBe(
      'cirbe-informe-global-sin-referencia.pdf',
    )
  })
})
