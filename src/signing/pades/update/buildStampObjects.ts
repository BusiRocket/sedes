import { indirectObject } from '../objects/indirectObject'
import { pdfArray } from '../objects/pdfArray'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { pdfRefTo } from '../objects/pdfRefTo'
import { streamObject } from '../objects/streamObject'
import type { ObjectAllocator } from '../types/ObjectAllocator'
import type { SignatureDetails } from '../types/SignatureDetails'
import type { StampObjects } from '../types/StampObjects'
import { allocateObject } from './allocateObject'
import { buildStampContent } from './buildStampContent'

/** A Helvetica font and the stamp's form XObject, placed at the page's bottom left. */
export const buildStampObjects = (
  allocator: ObjectAllocator,
  details: SignatureDetails,
): StampObjects => {
  const font = allocateObject(allocator)
  const appearance = allocateObject(allocator)
  const fontDict = pdfDict([
    ['Type', pdfRaw('/Font')],
    ['Subtype', pdfRaw('/Type1')],
    ['BaseFont', pdfRaw('/Helvetica')],
    ['Encoding', pdfRaw('/WinAnsiEncoding')],
  ])
  const formDict = pdfDict([
    ['Type', pdfRaw('/XObject')],
    ['Subtype', pdfRaw('/Form')],
    ['BBox', pdfArray(['0', '0', '300', '50'].map((value) => pdfRaw(value)))],
    ['Resources', pdfDict([['Font', pdfDict([['Helv', pdfRefTo(font)]])]])],
  ])
  return {
    rect: [36, 36, 336, 86],
    appearance: pdfRefTo(appearance),
    objects: [
      indirectObject(font, 0, fontDict),
      streamObject(appearance, formDict, buildStampContent(details)),
    ],
  }
}
