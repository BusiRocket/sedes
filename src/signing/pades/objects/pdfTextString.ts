/** A PDF text string: a literal `( )` for printable ASCII, UTF-16BE hex with a BOM otherwise. */
export const pdfTextString = (text: string): string => {
  if (/^[\x20-\x7e]*$/.test(text))
    return `(${text.replace(/[()\\]/g, (char) => `\\${char}`)})`
  return `<FEFF${Buffer.from(text, 'utf16le').swap16().toString('hex').toUpperCase()}>`
}
