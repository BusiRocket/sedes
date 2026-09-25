import type { DeadlineGroup } from '../../types/DeadlineGroup'

/** Quarterly VAT returns, as listed in the AEAT 2025 simplified calendar for individuals. */
export const vatQuarterly2025: DeadlineGroup = {
  modelos: ['303'],
  descripcion: 'Quarterly VAT return',
  regla:
    'Days 1-20 of April, July and October for the first three quarters; 1-30 January for the fourth quarter of the previous year. 20 April and 20 July 2025 are Sundays, so those periods run to the 21st.',
  periodos: [
    {
      periodo: '4T',
      ejercicioDevengo: 2024,
      presentacion: { desde: '2025-01-01', hasta: '2025-01-30' },
      domiciliacion: { desde: '2025-01-01', hasta: '2025-01-27' },
    },
    {
      periodo: '1T',
      ejercicioDevengo: 2025,
      presentacion: { desde: '2025-04-01', hasta: '2025-04-21' },
      domiciliacion: { desde: '2025-04-01', hasta: '2025-04-15' },
    },
    {
      periodo: '2T',
      ejercicioDevengo: 2025,
      presentacion: { desde: '2025-07-01', hasta: '2025-07-21' },
      domiciliacion: { desde: '2025-07-01', hasta: '2025-07-16' },
    },
    {
      periodo: '3T',
      ejercicioDevengo: 2025,
      presentacion: { desde: '2025-10-01', hasta: '2025-10-20' },
      domiciliacion: { desde: '2025-10-01', hasta: '2025-10-15' },
    },
  ],
}
