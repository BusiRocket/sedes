import { readText } from '../parsers/readText'
import type { StaRegistration } from '../types/StaRegistration'
import type { StaRole } from '../types/StaRole'
import type { StaRow } from '../types/StaRow'
import { isoFromSpanishDateTime } from './isoFromSpanishDateTime'

/** One `ds_ANOTACION_*` row as a registry entry. */
export const mapRegistration = (
  row: StaRow,
  role: StaRole,
): StaRegistration => ({
  role,
  number: readText(row, 'ANNOTNUMBER'),
  registeredAt: isoFromSpanishDateTime(readText(row, 'ANNOTTS')),
  unit: readText(row, 'ANNOTGROUPDESC'),
  summary: readText(row, 'ABSTRACT'),
})
