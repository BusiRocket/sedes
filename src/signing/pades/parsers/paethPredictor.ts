/** The PNG Paeth predictor (RFC 2083, 6.6). */
export const paethPredictor = (
  left: number,
  up: number,
  upLeft: number,
): number => {
  const estimate = left + up - upLeft
  const toLeft = Math.abs(estimate - left)
  const toUp = Math.abs(estimate - up)
  const toUpLeft = Math.abs(estimate - upLeft)
  if (toLeft <= toUp && toLeft <= toUpLeft) return left
  return toUp <= toUpLeft ? up : upLeft
}
