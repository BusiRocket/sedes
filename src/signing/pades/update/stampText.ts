/** Text for a Helvetica WinAnsi content stream: latin-1 bytes, other characters as `?`, `\\()` escaped. */
export const stampText = (text: string): string =>
  `(${text.replace(/[^\x20-\x7e\xa0-\xff]/g, '?').replace(/[()\\]/g, (char) => `\\${char}`)})`
