import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** Monthly withholding returns, as listed in the AEAT 2026 calendar. Modelo 430 is left out: its July period follows its own dates. */
export const withholdingsMonthly2026: DeadlineGroup = {
  modelos: ['111', '115', '117', '123', '124', '126', '128', '216', '230'],
  descripcion:
    'Monthly withholding returns, large companies and other monthly filers',
  regla:
    'Days 1-20 of the month after each month, moved to the next working day; direct debit until the 15th.',
  periodos: [
    {
      periodo: '12M',
      ejercicioDevengo: 2025,
      presentacion: { desde: '2026-01-01', hasta: '2026-01-20' },
      domiciliacion: { desde: '2026-01-01', hasta: '2026-01-15' },
    },
    {
      periodo: '1M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-02-01', hasta: '2026-02-20' },
      domiciliacion: { desde: '2026-02-01', hasta: '2026-02-17' },
    },
    {
      periodo: '2M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-03-01', hasta: '2026-03-20' },
      domiciliacion: { desde: '2026-03-01', hasta: '2026-03-16' },
    },
    {
      periodo: '3M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-04-01', hasta: '2026-04-20' },
      domiciliacion: { desde: '2026-04-01', hasta: '2026-04-15' },
    },
    {
      periodo: '4M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-05-01', hasta: '2026-05-20' },
      domiciliacion: { desde: '2026-05-01', hasta: '2026-05-15' },
    },
    {
      periodo: '5M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-06-01', hasta: '2026-06-22' },
      domiciliacion: { desde: '2026-06-01', hasta: '2026-06-17' },
    },
    {
      periodo: '6M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-07-01', hasta: '2026-07-20' },
      domiciliacion: { desde: '2026-07-01', hasta: '2026-07-15' },
    },
    {
      periodo: '7M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-08-01', hasta: '2026-08-20' },
      domiciliacion: { desde: '2026-08-01', hasta: '2026-08-17' },
    },
    {
      periodo: '8M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-09-01', hasta: '2026-09-21' },
      domiciliacion: { desde: '2026-09-01', hasta: '2026-09-16' },
    },
    {
      periodo: '9M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-10-01', hasta: '2026-10-20' },
      domiciliacion: { desde: '2026-10-01', hasta: '2026-10-15' },
    },
    {
      periodo: '10M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-11-01', hasta: '2026-11-20' },
      domiciliacion: { desde: '2026-11-01', hasta: '2026-11-17' },
    },
    {
      periodo: '11M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-12-01', hasta: '2026-12-21' },
      domiciliacion: { desde: '2026-12-01', hasta: '2026-12-16' },
    },
  ],
}
