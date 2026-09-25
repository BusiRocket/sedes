/** Read a big-endian unsigned field of `width` bytes (0 width yields undefined). */
export const readXrefField = (
  data: Buffer,
  at: number,
  width: number,
): number | undefined => {
  if (width === 0) return undefined
  let value = 0
  for (let index = 0; index < width; index += 1)
    value = value * 256 + (data[at + index] ?? 0)
  return value
}
