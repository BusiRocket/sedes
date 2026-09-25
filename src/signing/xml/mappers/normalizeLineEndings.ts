/** XML end-of-line handling: CRLF and lone CR become LF. */
export const normalizeLineEndings = (text: string): string =>
  text.replaceAll(/\r\n?/g, '\n')
