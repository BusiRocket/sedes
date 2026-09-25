import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** VAT and personal income tax instalments by quarter, as listed in the AEAT 2026 calendar. */
export const vatQuarterly2026: DeadlineGroup = {
  modelos: ['303', '309', '130', '131'],
  descripcion:
    'Quarterly VAT returns (303, 309) and personal income tax instalments, direct (130) and objective (131) assessment',
  regla:
    'Days 1-20 of April, July and October for the first three quarters; 1-30 January for the fourth quarter of the previous year.',
  periodos: [
    {
      periodo: '4T',
      ejercicioDevengo: 2025,
      presentacion: { desde: '2026-01-01', hasta: '2026-01-30' },
      domiciliacion: { desde: '2026-01-01', hasta: '2026-01-27' },
    },
    {
      periodo: '1T',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-04-01', hasta: '2026-04-20' },
      domiciliacion: { desde: '2026-04-01', hasta: '2026-04-15' },
    },
    {
      periodo: '2T',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-07-01', hasta: '2026-07-20' },
      domiciliacion: { desde: '2026-07-01', hasta: '2026-07-15' },
    },
    {
      periodo: '3T',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-10-01', hasta: '2026-10-20' },
      domiciliacion: { desde: '2026-10-01', hasta: '2026-10-15' },
    },
  ],
}
