import { pdfArray } from '../objects/pdfArray'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { pdfTextString } from '../objects/pdfTextString'
import type { PdfDict } from '../types/PdfDict'
import type { WidgetParts } from '../types/WidgetParts'

/** The merged signature field and widget annotation (/F 132: print + locked). */
export const buildWidget = (parts: WidgetParts): PdfDict => {
  const rect = parts.stamp?.rect ?? [0, 0, 0, 0]
  return pdfDict([
    ['Type', pdfRaw('/Annot')],
    ['Subtype', pdfRaw('/Widget')],
    ['FT', pdfRaw('/Sig')],
    ['T', pdfRaw(pdfTextString(parts.fieldName))],
    ['V', parts.signature],
    ['F', pdfRaw('132')],
    ['Rect', pdfArray(rect.map((value) => pdfRaw(String(value))))],
    ['P', parts.page],
    ...(parts.stamp
      ? [['AP', pdfDict([['N', parts.stamp.appearance]])] as const]
      : []),
  ])
}
