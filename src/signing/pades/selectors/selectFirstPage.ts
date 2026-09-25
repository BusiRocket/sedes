import { pdfDictGet } from '../objects/pdfDictGet'
import { resolvePdfValue } from '../objects/resolvePdfValue'
import { readPdfObject } from '../parsers/readPdfObject'
import type { PdfDict } from '../types/PdfDict'
import type { PdfDocument } from '../types/PdfDocument'
import type { PdfPage } from '../types/PdfPage'

/** Descend /Pages through the first /Kids to the first leaf page. */
export const selectFirstPage = (
  doc: PdfDocument,
  catalog: PdfDict,
): PdfPage => {
  let node = pdfDictGet(catalog, 'Pages')
  for (let depth = 0; depth < 64; depth += 1) {
    if (node?.kind !== 'ref')
      throw new Error('page tree node is not a reference')
    const dict = readPdfObject(doc, node.num)
    if (dict.kind !== 'dict')
      throw new Error('page tree node is not a dictionary')
    const kids = resolvePdfValue(doc, pdfDictGet(dict, 'Kids'))
    if (kids?.kind !== 'array') return { ref: node, dict }
    node = kids.items[0]
  }
  throw new Error('page tree too deep')
}
