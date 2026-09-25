import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** Monthly VAT returns, as listed in the AEAT 2026 calendar. */
export const vatMonthly2026: DeadlineGroup = {
  modelos: ['303', '353'],
  descripcion: 'Monthly VAT returns (303, 353)',
  regla:
    'Days 1-30 of the month after each month, moved to the next working day; direct debit until the 25th.',
  periodos: [
    {
      periodo: '12M',
      ejercicioDevengo: 2025,
      presentacion: { desde: '2026-01-01', hasta: '2026-01-30' },
      domiciliacion: { desde: '2026-01-01', hasta: '2026-01-27' },
    },
    {
      periodo: '1M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-02-01', hasta: '2026-03-02' },
      domiciliacion: { desde: '2026-02-01', hasta: '2026-02-25' },
    },
    {
      periodo: '2M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-03-01', hasta: '2026-03-30' },
      domiciliacion: { desde: '2026-03-01', hasta: '2026-03-25' },
    },
    {
      periodo: '3M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-04-01', hasta: '2026-04-30' },
      domiciliacion: { desde: '2026-04-01', hasta: '2026-04-27' },
    },
    {
      periodo: '4M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-05-01', hasta: '2026-06-01' },
      domiciliacion: { desde: '2026-05-01', hasta: '2026-05-27' },
    },
    {
      periodo: '5M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-06-01', hasta: '2026-06-30' },
      domiciliacion: { desde: '2026-06-01', hasta: '2026-06-25' },
    },
    {
      periodo: '6M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-07-01', hasta: '2026-07-30' },
      domiciliacion: { desde: '2026-07-01', hasta: '2026-07-27' },
    },
    {
      periodo: '7M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-08-01', hasta: '2026-08-31' },
      domiciliacion: { desde: '2026-08-01', hasta: '2026-08-26' },
    },
    {
      periodo: '8M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-09-01', hasta: '2026-09-30' },
      domiciliacion: { desde: '2026-09-01', hasta: '2026-09-25' },
    },
    {
      periodo: '9M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-10-01', hasta: '2026-10-30' },
      domiciliacion: { desde: '2026-10-01', hasta: '2026-10-27' },
    },
    {
      periodo: '10M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-11-01', hasta: '2026-11-30' },
      domiciliacion: { desde: '2026-11-01', hasta: '2026-11-25' },
    },
    {
      periodo: '11M',
      ejercicioDevengo: 2026,
      presentacion: { desde: '2026-12-01', hasta: '2026-12-30' },
      domiciliacion: { desde: '2026-12-01', hasta: '2026-12-24' },
    },
  ],
}
