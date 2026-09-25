import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** The annual returns of 2024, as listed in the AEAT 2025 simplified calendar for individuals. */
export const annualReturns2025: readonly DeadlineGroup[] = [
  {
    modelos: ['100', '714'],
    descripcion: 'Personal income tax (Renta 2024) and wealth tax returns',
    regla:
      'Until 30 June; a return to be paid by direct debit must be filed by 25 June. The start date is not on the verified page.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2024,
        presentacion: { hasta: '2025-06-30' },
        domiciliacion: { hasta: '2025-06-25' },
      },
    ],
  },
  {
    modelos: ['102'],
    descripcion: 'Second instalment of the personal income tax return',
    regla:
      'Until 5 November; the direct debit of the second instalment, for those who debited the first, until 30 September.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2024,
        presentacion: { hasta: '2025-11-05' },
        domiciliacion: { hasta: '2025-09-30' },
      },
    ],
  },
  {
    modelos: ['718'],
    descripcion: 'Temporary solidarity tax on large fortunes',
    regla: 'Days 1-31 July; direct debit until 28 July.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2024,
        presentacion: { desde: '2025-07-01', hasta: '2025-07-31' },
        domiciliacion: { desde: '2025-07-01', hasta: '2025-07-28' },
      },
    ],
  },
]
