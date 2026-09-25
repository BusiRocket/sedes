import { pdfDictGet } from '../objects/pdfDictGet'
import { pdfRawNumber } from '../objects/pdfRawNumber'
import type { PdfDict } from '../types/PdfDict'
import { undoPngPredictor } from './undoPngPredictor'

/** Undo the PNG predictor named in /DecodeParms, if any. */
export const applyPngPredictor = (dict: PdfDict, inflated: Buffer): Buffer => {
  const parms = pdfDictGet(dict, 'DecodeParms')
  if (parms?.kind !== 'dict') return inflated
  const predictor = pdfRawNumber(pdfDictGet(parms, 'Predictor')) ?? 1
  if (predictor < 10) return inflated
  return undoPngPredictor(
    inflated,
    pdfRawNumber(pdfDictGet(parms, 'Columns')) ?? 1,
  )
}
