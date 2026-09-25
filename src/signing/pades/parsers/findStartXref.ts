/** The offset recorded after the last `startxref` keyword. */
export const findStartXref = (text: string): number => {
  const at = text.lastIndexOf('startxref')
  const match =
    at === -1 ? null : /^startxref\s+(\d+)/.exec(text.slice(at, at + 40))
  if (!match?.[1])
    throw new Error('startxref not found: not a PDF, or truncated')
  return Number(match[1])
}
