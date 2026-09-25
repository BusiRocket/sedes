import { describe, expect, it } from 'vitest'

import { informativeFromCells } from './informativeFromCells'

describe('informativeFromCells', () => {
  it('maps a full row, with the empty periodo as 0A', () => {
    expect(
      informativeFromCells([
        '1900000000001',
        '2025190000001',
        '',
        '20/01/2026',
        '',
        'X',
        '',
        'Presentada',
        '2',
      ]),
    ).toEqual({
      justificante: '1900000000001',
      expediente: '2025190000001',
      periodo: '0A',
      fechaPresentacion: '2026-01-20',
      complementaria: false,
      sustitutiva: true,
      estado: 'Presentada',
    })
  })

  it('keeps a stated periodo', () => {
    expect(
      informativeFromCells([
        'j',
        '2025190000002',
        '1T',
        '01/04/2025',
        'X',
        '',
        '',
        'ok',
      ])?.periodo,
    ).toBe('1T')
  })

  it('skips short rows, the td header row and rows without expediente', () => {
    expect(informativeFromCells(['Justificante', 'Expediente'])).toBeUndefined()
    expect(
      informativeFromCells(['j', '', '', '', '', '', '', 'x']),
    ).toBeUndefined()
    expect(
      informativeFromCells([
        'Justificante',
        'Expediente',
        'Periodo',
        'Fecha Presentación',
        'Complementaria',
        'Sustitutiva',
        'Justificante anterior',
        'Estado',
      ]),
    ).toBeUndefined()
  })
})
