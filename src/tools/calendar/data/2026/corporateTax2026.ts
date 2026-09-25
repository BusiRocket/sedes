import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** Corporate income tax return and instalments, as listed in the AEAT 2026 calendar. */
export const corporateTax2026: readonly DeadlineGroup[] = [
  {
    modelos: ['200'],
    descripcion:
      'Corporate income tax return, entities whose tax period equals the calendar year 2025',
    regla:
      'The 25 calendar days after the six months following the end of the tax period: 1-25 July, moved to Monday 27 July 2026.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2025,
        presentacion: { desde: '2026-07-01', hasta: '2026-07-27' },
        domiciliacion: { desde: '2026-07-01', hasta: '2026-07-22' },
      },
    ],
  },
  {
    modelos: ['202'],
    descripcion: 'Corporate income tax instalments',
    regla:
      'Days 1-20 of April, October and December; 20 December 2026 is a Sunday, so the third instalment runs to 21 December.',
    periodos: [
      {
        periodo: '1P',
        ejercicioDevengo: 2026,
        presentacion: { desde: '2026-04-01', hasta: '2026-04-20' },
        domiciliacion: { desde: '2026-04-01', hasta: '2026-04-15' },
      },
      {
        periodo: '2P',
        ejercicioDevengo: 2026,
        presentacion: { desde: '2026-10-01', hasta: '2026-10-20' },
        domiciliacion: { desde: '2026-10-01', hasta: '2026-10-15' },
      },
      {
        periodo: '3P',
        ejercicioDevengo: 2026,
        presentacion: { desde: '2026-12-01', hasta: '2026-12-21' },
        domiciliacion: { desde: '2026-12-01', hasta: '2026-12-16' },
      },
    ],
  },
]
