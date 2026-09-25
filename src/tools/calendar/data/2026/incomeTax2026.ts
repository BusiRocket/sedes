import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** The 2025 personal income and wealth tax campaign, as listed in the AEAT 2026 calendar. */
export const incomeTax2026: readonly DeadlineGroup[] = [
  {
    modelos: ['100'],
    descripcion: 'Personal income tax return (Renta 2025)',
    regla:
      'From 8 April to 30 June; a return to be paid by direct debit must be filed by 25 June.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2025,
        presentacion: { desde: '2026-04-08', hasta: '2026-06-30' },
        domiciliacion: { hasta: '2026-06-25' },
      },
    ],
  },
  {
    modelos: ['151', '714'],
    descripcion:
      'Special regime for workers posted to Spain (151) and wealth tax (714)',
    regla:
      'Until 30 June; a return to be paid by direct debit must be filed by 25 June.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2025,
        presentacion: { hasta: '2026-06-30' },
        domiciliacion: { hasta: '2026-06-25' },
      },
    ],
  },
  {
    modelos: ['102'],
    descripcion: 'Second instalment of the personal income tax return',
    regla:
      'Until 5 November; the direct debit of the second instalment can be set up, revoked or restored until 30 September.',
    periodos: [
      {
        periodo: '0A',
        ejercicioDevengo: 2025,
        presentacion: { hasta: '2026-11-05' },
        domiciliacion: { hasta: '2026-09-30' },
      },
    ],
  },
]
