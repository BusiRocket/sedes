import { inflateSync } from 'node:zlib'

import { maxDecodedStreamBytes } from '../maxDecodedStreamBytes'
import { selectSingleFilter } from '../selectors/selectSingleFilter'
import type { PdfDict } from '../types/PdfDict'
import { applyPngPredictor } from './applyPngPredictor'

/** Decode a stream's data: no filter or /FlateDecode, with an optional PNG predictor. */
export const decodeStreamData = (dict: PdfDict, raw: Buffer): Buffer => {
  const filter = selectSingleFilter(dict)
  if (filter === undefined) return raw
  if (filter.kind !== 'raw' || filter.text !== '/FlateDecode') {
    throw new Error(
      'only FlateDecode streams are supported in structural objects',
    )
  }
  return applyPngPredictor(
    dict,
    inflateSync(raw, { maxOutputLength: maxDecodedStreamBytes }),
  )
}
