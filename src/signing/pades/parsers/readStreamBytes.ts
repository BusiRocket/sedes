import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfRawNumber } from '../objects/pdfRawNumber'
import type { PdfDict } from '../types/PdfDict'

/**
 * The raw (still encoded) bytes of a stream. A direct /Length is trusted; an
 * indirect one is not resolved, the data then ends at `endstream` minus its EOL.
 */
export const readStreamBytes = (
  pdf: Buffer,
  dict: PdfDict,
  dataStart: number,
): Buffer => {
  const length = pdfRawNumber(pdfDictGet(dict, 'Length'))
  if (length !== undefined) return pdf.subarray(dataStart, dataStart + length)
  const end = pdf.indexOf('endstream', dataStart, 'latin1')
  if (end === -1) throw new Error('stream without endstream')
  let stop = end
  if (pdf[stop - 1] === 0x0a) stop -= 1
  if (pdf[stop - 1] === 0x0d) stop -= 1
  return pdf.subarray(dataStart, stop)
}
