import { indirectObject } from '../objects/indirectObject'
import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfRawNumber } from '../objects/pdfRawNumber'
import { pdfRefTo } from '../objects/pdfRefTo'
import { selectCatalog } from '../selectors/selectCatalog'
import { selectFirstPage } from '../selectors/selectFirstPage'
import type { ObjectAllocator } from '../types/ObjectAllocator'
import type { PdfDocument } from '../types/PdfDocument'
import type { PdfUpdateObject } from '../types/PdfUpdateObject'
import type { SignatureRequest } from '../types/SignatureRequest'
import { allocateObject } from './allocateObject'
import { buildSignatureDict } from './buildSignatureDict'
import { buildStampObjects } from './buildStampObjects'
import { buildWidget } from './buildWidget'
import { extendAcroForm } from './extendAcroForm'
import { extendAnnots } from './extendAnnots'

/** Every object the incremental update writes, the signature dictionary first. */
export const planSignatureObjects = (
  doc: PdfDocument,
  request: SignatureRequest,
): PdfUpdateObject[] => {
  const allocator: ObjectAllocator = {
    next: pdfRawNumber(pdfDictGet(doc.trailer, 'Size')) ?? 0,
  }
  const catalog = selectCatalog(doc)
  const page = selectFirstPage(doc, catalog.dict)
  const signature = allocateObject(allocator)
  const widget = allocateObject(allocator)
  const stamp = request.visible
    ? buildStampObjects(allocator, request)
    : undefined
  const widgetDict = buildWidget({
    signature: pdfRefTo(signature),
    page: page.ref,
    fieldName: `Signature${String(widget)}`,
    stamp,
  })
  const form = extendAcroForm(doc, catalog.dict, pdfRefTo(widget), allocator)
  const annots = extendAnnots(doc, page.dict, pdfRefTo(widget))
  return [
    indirectObject(signature, 0, buildSignatureDict(request)),
    indirectObject(widget, 0, widgetDict),
    ...(stamp?.objects ?? []),
    ...form.objects,
    ...annots.objects,
    ...(form.dict
      ? [indirectObject(catalog.ref.num, catalog.ref.gen, form.dict)]
      : []),
    ...(annots.dict
      ? [indirectObject(page.ref.num, page.ref.gen, annots.dict)]
      : []),
  ]
}
