import type { RiskRequest } from '../types/RiskRequest'

/** Map a `RegistrosSolicitudesRiesgos` row to a `RiskRequest`. */
export const riskRequestFromRecord = (
  record: Readonly<Record<string, string>>,
): RiskRequest => ({
  fechaSolicitud: record['FECHASOLICITUD'] ?? '',
  referencia: record['REFERENCIA'] ?? '',
  periodo: record['PERIODOSOLICITADO'] ?? '',
  estado: record['ESTADO'] ?? '',
  fechaObtencion: record['FECHAOBTENCION'] ?? '',
})
