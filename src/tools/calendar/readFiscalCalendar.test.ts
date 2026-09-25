import { describe, expect, it } from 'vitest'

import { readFiscalCalendar } from './readFiscalCalendar'

describe('readFiscalCalendar', () => {
  it('answers the third-quarter VAT deadline of 2026', () => {
    const calendar = readFiscalCalendar({
      ejercicio: 2026,
      modelo: '303',
      periodo: '3t',
    })
    expect(calendar.ejercicio).toBe(2026)
    expect(calendar.aplazamiento).toContain('next working day')
    expect(calendar.fuentes[0]).toMatch(/^https:\/\/sede\.agenciatributaria/)
    expect(calendar.plazos).toEqual([
      expect.objectContaining({
        modelo: '303',
        periodo: '3T',
        ejercicioDevengo: 2026,
        presentacion: { desde: '2026-10-01', hasta: '2026-10-20' },
        domiciliacion: { desde: '2026-10-01', hasta: '2026-10-15' },
      }),
    ])
  })

  it('files the fourth quarter of the previous year in January', () => {
    const [entry] = readFiscalCalendar({
      ejercicio: 2026,
      modelo: '130',
      periodo: '4T',
    }).plazos
    expect(entry?.ejercicioDevengo).toBe(2025)
    expect(entry?.presentacion.hasta).toBe('2026-01-30')
    expect(entry?.domiciliacion?.hasta).toBe('2026-01-27')
  })

  it('leaves out the direct debit of a modelo that carries no payment', () => {
    const [entry] = readFiscalCalendar({
      ejercicio: 2026,
      modelo: '347',
    }).plazos
    expect(entry).not.toHaveProperty('domiciliacion')
    expect(entry?.presentacion).toEqual({ hasta: '2026-03-02' })
  })

  it('lists every deadline of a year in date order', () => {
    const plazos = readFiscalCalendar({ ejercicio: 2025 }).plazos
    const days = plazos.map((entry) => entry.presentacion.hasta)
    expect(days).toEqual([...days].sort())
    expect(new Set(plazos.map((entry) => entry.modelo))).toEqual(
      new Set(['100', '102', '303', '714', '718']),
    )
  })

  it('refuses a year that was not verified', () => {
    expect(() => readFiscalCalendar({ ejercicio: 2024 })).toThrow(
      'the 2024 calendar is not verified against the AEAT; verified years: 2025, 2026',
    )
  })

  it('refuses a modelo the year does not list', () => {
    expect(() =>
      readFiscalCalendar({ ejercicio: 2025, modelo: '111' }),
    ).toThrow('modelo 111 is not verified in the 2025 calendar')
  })
})
