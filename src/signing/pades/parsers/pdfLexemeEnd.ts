/** Index just past the run of regular characters starting at `start` (up to whitespace or a delimiter). */
export const pdfLexemeEnd = (text: string, start: number): number => {
  const stops = '\0\t\n\f\r ()<>[]{}/%'
  let index = start
  while (index < text.length && !stops.includes(text.charAt(index))) index += 1
  return index
}
