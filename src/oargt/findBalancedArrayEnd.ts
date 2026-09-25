/**
 * The index of the `]` that closes a JSON array literal starting at
 * `startIndex` (which must point at its opening `[`), honoring quoted
 * strings so a `]` inside one (an address, a description) is never mistaken
 * for the array's end. -1 when the array never closes.
 */
export const findBalancedArrayEnd = (
  text: string,
  startIndex: number,
): number => {
  const token = /"(?:\\.|[^"\\])*"|[[\]]/g
  let depth = 0
  for (const match of text.slice(startIndex).matchAll(token)) {
    if (match[0] === '[') depth += 1
    else if (match[0] === ']') {
      depth -= 1
      if (depth === 0) return startIndex + match.index
    }
  }
  return -1
}
