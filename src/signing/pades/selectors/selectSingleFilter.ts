import { pdfDictGet } from '../objects/pdfDictGet'
import type { PdfDict } from '../types/PdfDict'
import type { PdfValue } from '../types/PdfValue'

/** A stream's /Filter, unwrapped from a one-item array; undefined when there is none. */
export const selectSingleFilter = (dict: PdfDict): PdfValue | undefined => {
  const filter = pdfDictGet(dict, 'Filter')
  if (filter?.kind !== 'array') return filter
  if (filter.items.length > 1)
    throw new Error('chained stream filters are not supported')
  return filter.items[0]
}
