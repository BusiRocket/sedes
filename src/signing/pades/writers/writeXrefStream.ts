import { pdfArray } from '../objects/pdfArray'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { streamObject } from '../objects/streamObject'
import { selectTrailerCarry } from '../selectors/selectTrailerCarry'
import type { XrefWriteInput } from '../types/XrefWriteInput'
import { groupXrefRuns } from './groupXrefRuns'
import { xrefStreamRow } from './xrefStreamRow'

/** An unfiltered xref stream (object number `size`, listing itself), with /Prev and startxref. */
export const writeXrefStream = (input: XrefWriteInput): Buffer => {
  const self = { num: input.size, gen: 0, offset: input.xrefOffset }
  const runs = groupXrefRuns([...input.offsets, self])
  const index = runs.flatMap((run) => [run.first, run.entries.length])
  const dict = pdfDict([
    ['Type', pdfRaw('/XRef')],
    ['Size', pdfRaw(String(input.size + 1))],
    ['Index', pdfArray(index.map((value) => pdfRaw(String(value))))],
    ['W', pdfArray(['1', '4', '2'].map((value) => pdfRaw(value)))],
    ...selectTrailerCarry(input.doc.trailer),
    ['Prev', pdfRaw(String(input.doc.startXref))],
  ])
  const data = Buffer.concat(
    runs.flatMap((run) => run.entries.map((entry) => xrefStreamRow(entry))),
  )
  const tail = `startxref\n${String(input.xrefOffset)}\n%%EOF\n`
  return Buffer.concat([
    streamObject(input.size, dict, data).bytes,
    Buffer.from(tail, 'latin1'),
  ])
}
