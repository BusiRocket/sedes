import { describe, expect, it } from 'vitest'

import { verifiedCalendars } from './verifiedCalendars'

const isoDay = /^\d{4}-\d{2}-\d{2}$/

describe('verifiedCalendars', () => {
  it.each([...verifiedCalendars.values()])(
    'keeps every $year window inside the year and in order',
    (calendar) => {
      for (const group of calendar.groups) {
        for (const period of group.periodos) {
          const { presentacion, domiciliacion } = period
          expect(presentacion.hasta).toMatch(isoDay)
          expect(presentacion.hasta.startsWith(String(calendar.year))).toBe(
            true,
          )
          expect((presentacion.desde ?? '') <= presentacion.hasta).toBe(true)
          expect((domiciliacion?.hasta ?? '') < presentacion.hasta).toBe(true)
        }
      }
    },
  )

  it('cites an AEAT page for every year', () => {
    for (const calendar of verifiedCalendars.values()) {
      expect(calendar.sources.length).toBeGreaterThan(0)
      for (const source of calendar.sources) {
        expect(source).toMatch(/^https:\/\/sede\.agenciatributaria\.gob\.es\//)
      }
    }
  })
})
