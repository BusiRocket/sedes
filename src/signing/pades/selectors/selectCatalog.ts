import { pdfDictGet } from '../objects/pdfDictGet'
import { readPdfObject } from '../parsers/readPdfObject'
import type { PdfDocument } from '../types/PdfDocument'
import type { PdfPage } from '../types/PdfPage'

/** The document catalog (/Root) and its reference. */
export const selectCatalog = (doc: PdfDocument): PdfPage => {
  const root = pdfDictGet(doc.trailer, 'Root')
  if (root?.kind !== 'ref') throw new Error('trailer has no /Root reference')
  const dict = readPdfObject(doc, root.num)
  if (dict.kind !== 'dict') throw new Error('catalog is not a dictionary')
  return { ref: root, dict }
}
