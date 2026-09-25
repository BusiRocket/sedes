import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfRawNumber } from '../objects/pdfRawNumber'
import type { PdfDocument } from '../types/PdfDocument'
import type { PdfValue } from '../types/PdfValue'
import { decodeStreamData } from './decodeStreamData'
import { readCompressedObject } from './readCompressedObject'
import { readObjectAt } from './readObjectAt'
import { readStreamBytes } from './readStreamBytes'

/** The value of indirect object `num`, whether it sits at an offset or inside an object stream. */
export const readPdfObject = (doc: PdfDocument, num: number): PdfValue => {
  const entry = doc.entries.get(num)
  if (entry?.type === 'offset')
    return readObjectAt(doc.text, entry.offset).value
  if (entry?.type !== 'compressed')
    throw new Error(`object ${String(num)} is not in the xref`)
  const container = doc.entries.get(entry.stream)
  if (container?.type !== 'offset')
    throw new Error(`object stream ${String(entry.stream)} missing`)
  const { value, dataStart } = readObjectAt(doc.text, container.offset)
  if (value.kind !== 'dict' || dataStart === undefined)
    throw new Error('object stream expected')
  const data = decodeStreamData(
    value,
    readStreamBytes(doc.pdf, value, dataStart),
  )
  return readCompressedObject(
    data,
    pdfRawNumber(pdfDictGet(value, 'First')) ?? 0,
    entry.index,
  )
}
