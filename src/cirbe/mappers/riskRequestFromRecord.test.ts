import { describe, expect, it } from 'vitest'

import { riskRequestFromRecord } from './riskRequestFromRecord'

describe('riskRequestFromRecord', () => {
  it('maps the listed columns and defaults the missing ones', () => {
    expect(
      riskRequestFromRecord({
        FECHASOLICITUD: '01-09-2026',
        REFERENCIA: 'R1',
        PERIODOSOLICITADO: '2026-07',
        ESTADO: 'Resuelta',
      }),
    ).toEqual({
      fechaSolicitud: '01-09-2026',
      referencia: 'R1',
      periodo: '2026-07',
      estado: 'Resuelta',
      fechaObtencion: '',
    })
  })

  it('maps an empty row to empty strings', () => {
    expect(riskRequestFromRecord({}).referencia).toBe('')
  })
})
