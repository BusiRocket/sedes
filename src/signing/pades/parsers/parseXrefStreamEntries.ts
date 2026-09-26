import { pdfDictGet } from '../objects/pdfDictGet'
import { selectXrefRanges } from '../selectors/selectXrefRanges'
import type { PdfDict } from '../types/PdfDict'
import type { XrefEntry } from '../types/XrefEntry'
import { assertXrefLayout } from './assertXrefLayout'
import { numberItems } from './numberItems'
import { readXrefRow } from './readXrefRow'

/** Entries of a decoded xref stream, laid out by /W and /Index. */
export const parseXrefStreamEntries = (
  dict: PdfDict,
  data: Buffer,
): Map<number, XrefEntry> => {
  const widths = numberItems(pdfDictGet(dict, 'W'))
  const rowWidth = widths.reduce((sum, width) => sum + width, 0)
  const ranges = selectXrefRanges(dict)
  assertXrefLayout(widths, ranges, data.length)
  const entries = new Map<number, XrefEntry>()
  let at = 0
  for (let range = 0; range + 1 < ranges.length; range += 2) {
    const [first = 0, count = 0] = ranges.slice(range, range + 2)
    for (let offset = 0; offset < count; offset += 1) {
      entries.set(first + offset, readXrefRow(data, at, widths))
      at += rowWidth
    }
  }
  return entries
}
