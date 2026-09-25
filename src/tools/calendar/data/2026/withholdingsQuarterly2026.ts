import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** Quarterly withholding returns, as listed in the AEAT 2026 calendar. */
export const withholdingsQuarterly2026: DeadlineGroup = {
  modelos: ['111', '115', '117', '123', '124', '126', '128', '216'],
  descripcion:
    'Quarterly withholding returns, among them work and professional income (111), property rent (115) and capital income (123)',
  regla:
    'Days 1-20 of the month after each quarter, January included for the fourth quarter of the previous year.',
  periodos: [
    {
      periodo: '4T',
      ejercicioDevengo: 2025,
      presentacion: { desde: '2026-01-01', hasta: '2026-01-20' },
      domiciliacion: { desde: '2026-01-01', hasta: '2026-01-15' },
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
