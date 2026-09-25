import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** The quarterly recapitulative statement of intra-EU operations, as listed in the AEAT 2026 calendar. */
export const intraCommunity2026: DeadlineGroup = {
  modelos: ['349'],
  descripcion:
    'Recapitulative statement of intra-community operations, quarterly filers',
  regla:
    'Until the 20th of the month after each quarter; until 30 January for the fourth quarter of the previous year. No payment, so no direct debit.',
  periodos: [
    {
      periodo: '4T',
      ejercicioDevengo: 2025,
      presentacion: { hasta: '2026-01-30' },
    },
    {
      periodo: '1T',
      ejercicioDevengo: 2026,
      presentacion: { hasta: '2026-04-20' },
    },
    {
      periodo: '2T',
      ejercicioDevengo: 2026,
      presentacion: { hasta: '2026-07-20' },
    },
    {
      periodo: '3T',
      ejercicioDevengo: 2026,
      presentacion: { hasta: '2026-10-20' },
    },
  ],
}
