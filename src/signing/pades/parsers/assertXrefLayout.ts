/**
 * Refuse an xref stream whose /W widths or /Index counts do not fit its own
 * data: both come from the file, and they bound the loops that read it.
 */
export const assertXrefLayout = (
  widths: readonly number[],
  ranges: readonly number[],
  dataLength: number,
): void => {
  if (
    widths.some((width) => !Number.isInteger(width) || width < 0 || width > 8)
  )
    throw new Error('xref stream /W widths out of range')
  const rowWidth = widths.reduce((sum, width) => sum + width, 0)
  const rows = ranges
    .filter((_, index) => index % 2 === 1)
    .reduce((sum, count) => sum + count, 0)
  if (!Number.isInteger(rows) || rows < 0 || rows * rowWidth > dataLength)
    throw new Error('xref stream /Index does not fit its data')
}
