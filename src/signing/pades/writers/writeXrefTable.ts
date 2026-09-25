import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { serializePdfValue } from '../objects/serializePdfValue'
import { selectTrailerCarry } from '../selectors/selectTrailerCarry'
import type { XrefWriteInput } from '../types/XrefWriteInput'
import { groupXrefRuns } from './groupXrefRuns'

/** A classic xref section, trailer with /Prev, and startxref. */
export const writeXrefTable = (input: XrefWriteInput): Buffer => {
  const lines = ['xref']
  for (const run of groupXrefRuns(input.offsets)) {
    lines.push(`${String(run.first)} ${String(run.entries.length)}`)
    for (const entry of run.entries) {
      const offset = String(entry.offset).padStart(10, '0')
      lines.push(`${offset} ${String(entry.gen).padStart(5, '0')} n `)
    }
  }
  const trailer = pdfDict([
    ['Size', pdfRaw(String(input.size))],
    ...selectTrailerCarry(input.doc.trailer),
    ['Prev', pdfRaw(String(input.doc.startXref))],
  ])
  lines.push(
    'trailer',
    serializePdfValue(trailer),
    'startxref',
    String(input.xrefOffset),
    '%%EOF',
    '',
  )
  return Buffer.from(lines.join('\n'), 'latin1')
}
