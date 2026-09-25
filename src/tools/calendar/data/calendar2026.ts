import type { VerifiedCalendar } from '../types/VerifiedCalendar'
import { annualSummaries2026 } from './2026/annualSummaries2026'
import { corporateTax2026 } from './2026/corporateTax2026'
import { incomeTax2026 } from './2026/incomeTax2026'
import { intraCommunity2026 } from './2026/intraCommunity2026'
import { vatMonthly2026 } from './2026/vatMonthly2026'
import { vatQuarterly2026 } from './2026/vatQuarterly2026'
import { withholdingsMonthly2026 } from './2026/withholdingsMonthly2026'
import { withholdingsQuarterly2026 } from './2026/withholdingsQuarterly2026'

/** The deadlines falling in 2026, read from the AEAT Calendario del contribuyente 2026. */
export const calendar2026: VerifiedCalendar = {
  year: 2026,
  sources: [
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/plazos-presentacion-autoliquidaciones-domiciliacion-bancaria.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/enero/hasta-20-enero.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/enero/hasta-30-enero.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/febrero/hasta-2-febrero.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/marzo/hasta-2-marzo.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/abril/hasta-20-abril.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/abril/8-abril-hasta-30-junio.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/julio/hasta-20-julio.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/julio/hasta-27-julio.html',
    'https://sede.agenciatributaria.gob.es/Sede/ayuda/calendario-contribuyente/calendario-contribuyente-2026/calendario-anual/octubre/hasta-20-octubre.html',
  ],
  groups: [
    vatQuarterly2026,
    vatMonthly2026,
    withholdingsQuarterly2026,
    withholdingsMonthly2026,
    intraCommunity2026,
    ...annualSummaries2026,
    ...incomeTax2026,
    ...corporateTax2026,
  ],
}
