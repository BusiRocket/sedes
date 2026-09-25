import { undoPngRow } from './undoPngRow'

/** Reverse PNG predictors (DecodeParms /Predictor >= 10) on rows of `columns` bytes, one byte per pixel. */
export const undoPngPredictor = (data: Buffer, columns: number): Buffer => {
  const rows = Math.floor(data.length / (columns + 1))
  const out = Buffer.alloc(rows * columns)
  for (let row = 0; row < rows; row += 1) undoPngRow(data, out, row, columns)
  return out
}
