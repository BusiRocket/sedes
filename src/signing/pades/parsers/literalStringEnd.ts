/** Index just past the literal string `( ... )` opening at `start`, honouring nesting and escapes. */
export const literalStringEnd = (text: string, start: number): number => {
  let depth = 0
  for (let index = start; index < text.length; index += 1) {
    const char = text.charAt(index)
    if (char === '\\') {
      index += 1
    } else if (char === '(') {
      depth += 1
    } else if (char === ')') {
      depth -= 1
      if (depth === 0) return index + 1
    }
  }
  throw new Error('unterminated literal string in PDF')
}
