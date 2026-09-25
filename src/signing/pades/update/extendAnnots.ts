import { indirectObject } from '../objects/indirectObject'
import { pdfArray } from '../objects/pdfArray'
import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfDictWith } from '../objects/pdfDictWith'
import { readPdfObject } from '../parsers/readPdfObject'
import type { DictChange } from '../types/DictChange'
import type { PdfDict } from '../types/PdfDict'
import type { PdfDocument } from '../types/PdfDocument'
import type { PdfRef } from '../types/PdfRef'

/** Append `widget` to the page's /Annots, which may be absent, inline or an indirect array. */
export const extendAnnots = (
  doc: PdfDocument,
  page: PdfDict,
  widget: PdfRef,
): DictChange => {
  const annots = pdfDictGet(page, 'Annots')
  if (annots?.kind === 'ref') {
    const array = readPdfObject(doc, annots.num)
    const items = array.kind === 'array' ? array.items : []
    return {
      dict: undefined,
      objects: [
        indirectObject(annots.num, annots.gen, pdfArray([...items, widget])),
      ],
    }
  }
  const items = annots?.kind === 'array' ? annots.items : []
  return {
    dict: pdfDictWith(page, 'Annots', pdfArray([...items, widget])),
    objects: [],
  }
}
