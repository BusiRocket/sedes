import { pdfArray } from '../objects/pdfArray'
import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfDictWith } from '../objects/pdfDictWith'
import { pdfRaw } from '../objects/pdfRaw'
import { resolvePdfValue } from '../objects/resolvePdfValue'
import type { PdfDict } from '../types/PdfDict'
import type { PdfDocument } from '../types/PdfDocument'
import type { PdfRef } from '../types/PdfRef'

/** An AcroForm with `field` appended to /Fields (inlined) and /SigFlags 3. */
export const withSignatureField = (
  doc: PdfDocument,
  form: PdfDict,
  field: PdfRef,
): PdfDict => {
  const fields = resolvePdfValue(doc, pdfDictGet(form, 'Fields'))
  const items = fields?.kind === 'array' ? fields.items : []
  return pdfDictWith(
    pdfDictWith(form, 'Fields', pdfArray([...items, field])),
    'SigFlags',
    pdfRaw('3'),
  )
}
