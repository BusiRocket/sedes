import type { XrefSection } from '../types/XrefSection'
import { decodeStreamData } from './decodeStreamData'
import { parseXrefStreamEntries } from './parseXrefStreamEntries'
import { parseXrefTable } from './parseXrefTable'
import { readObjectAt } from './readObjectAt'
import { readStreamBytes } from './readStreamBytes'

/** The cross-reference section at `offset`: a classic table, or an xref stream object. */
export const readXrefSection = (
  pdf: Buffer,
  text: string,
  offset: number,
): XrefSection => {
  const at = text.slice(offset).search(/\S/) + offset
  if (text.startsWith('xref', at)) return parseXrefTable(text, at)
  const { value, dataStart } = readObjectAt(text, at)
  if (value.kind !== 'dict' || dataStart === undefined) {
    throw new Error(`no xref table or xref stream at offset ${String(offset)}`)
  }
  const data = decodeStreamData(value, readStreamBytes(pdf, value, dataStart))
  return {
    entries: parseXrefStreamEntries(value, data),
    trailer: value,
    isStream: true,
  }
}
