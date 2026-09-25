import { paethPredictor } from './paethPredictor'

/** The value PNG filter `type` adds back to a byte, given its left, up and up-left neighbours. */
export const pngPrediction = (
  type: number,
  left: number,
  up: number,
  upLeft: number,
): number => {
  switch (type) {
    case 0:
      return 0
    case 1:
      return left
    case 2:
      return up
    case 3:
      return Math.floor((left + up) / 2)
    case 4:
      return paethPredictor(left, up, upLeft)
    default:
      throw new Error(`unknown PNG filter type ${String(type)}`)
  }
}
