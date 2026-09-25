import type { VerifiedCalendar } from '../types/VerifiedCalendar'
import { annualReturns2025 } from './2025/annualReturns2025'
import { vatQuarterly2025 } from './2025/vatQuarterly2025'

/**
 * The deadlines falling in 2025. Only the simplified calendar for individuals
 * could be read (the full 2025 calendar page answers with no content), so this
 * year covers modelos 100, 102, 303, 714 and 718 and nothing else.
 */
export const calendar2025: VerifiedCalendar = {
  year: 2025,
  sources: [
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/contenidos-lectura-facil/calendario-contribuyente-2025-simplificado-personas-fisicas/plazos-presentacion-autoliquidaciones-domiciliacion-bancaria.html',
  ],
  groups: [vatQuarterly2025, ...annualReturns2025],
}
