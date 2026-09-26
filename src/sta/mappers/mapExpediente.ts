import { readText } from '../parsers/readText'
import type { StaExpediente } from '../types/StaExpediente'
import type { StaRow } from '../types/StaRow'
import { isoFromCompactDate } from './isoFromCompactDate'

/** One `ds_EXPEDIENTES_FULL_*` row as an expediente. */
export const mapExpediente = (
  row: StaRow,
  archived: boolean,
): StaExpediente => ({
  number: readText(row, 'numeroFormateado'),
  archived,
  openedOn: isoFromCompactDate(readText(row, 'fechaAlta')),
  registeredOn: isoFromCompactDate(readText(row, 'fechaRegistro')),
  registryEntry: readText(row, 'numAnnotacion'),
  procedure: readText(row, 'procedimientoDesc'),
  requestType: readText(row, 'tipoSolicitudDesc'),
  phase: readText(row, 'faseDesc'),
  status: readText(row, 'estadoDesc'),
  description: readText(row, 'descripcion'),
  holder: readText(row, 'nombreCompleto'),
})
