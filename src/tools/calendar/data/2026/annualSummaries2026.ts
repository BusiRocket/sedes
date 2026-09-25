import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** The annual summaries and informative returns of 2025, as listed in the AEAT 2026 calendar. */
export const annualSummaries2026: readonly DeadlineGroup[] = [
  {
    modelos: ['390'],
    descripcion: 'Annual VAT summary',
    regla: 'Until 30 January of the following year.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2025,
        presentacion: { hasta: '2026-01-30' },
      },
    ],
  },
  {
    modelos: ['180', '190', '193'],
    descripcion:
      'Annual summaries of withholdings on property rent (180), work and professional income (190) and capital income (193)',
    regla:
      'Until 31 January of the following year; 31 January 2026 is a Saturday, so it moves to Monday 2 February.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2025,
        presentacion: { hasta: '2026-02-02' },
      },
    ],
  },
  {
    modelos: ['347'],
    descripcion:
      'Annual statement of operations with third parties over 3,005.06 euros',
    regla:
      'During February of the following year; 28 February 2026 is a Saturday, so it moves to Monday 2 March.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2025,
        presentacion: { hasta: '2026-03-02' },
      },
    ],
  },
]
