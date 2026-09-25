import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfRawNumber } from '../objects/pdfRawNumber'
import { numberItems } from '../parsers/numberItems'
import type { PdfDict } from '../types/PdfDict'

/** An xref stream's `[first count ...]` ranges: /Index, or `[0 Size]` when absent. */
export const selectXrefRanges = (dict: PdfDict): number[] => {
  const index = numberItems(pdfDictGet(dict, 'Index'))
  return index.length > 0
    ? index
    : [0, pdfRawNumber(pdfDictGet(dict, 'Size')) ?? 0]
}
