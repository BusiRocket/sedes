import { byteOrZero } from './byteOrZero'
import { pngPrediction } from './pngPrediction'

/** Reverse the PNG predictor of row `row` of `data` into `out` (rows of `columns` bytes). */
export const undoPngRow = (
  data: Buffer,
  out: Buffer,
  row: number,
  columns: number,
): void => {
  const source = row * (columns + 1)
  const type = byteOrZero(data, source)
  for (let column = 0; column < columns; column += 1) {
    const at = row * columns + column
    const left = column > 0 ? byteOrZero(out, at - 1) : 0
    const up = byteOrZero(out, at - columns)
    const upLeft = column > 0 ? byteOrZero(out, at - columns - 1) : 0
    const encoded = byteOrZero(data, source + 1 + column)
    out[at] = (encoded + pngPrediction(type, left, up, upLeft)) & 0xff
  }
}
