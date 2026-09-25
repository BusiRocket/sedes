/**
 * The `ncc` of the carta de pago PDF: a direct VerPdfWlpl link when the page
 * prints one, else the value the OBTENERDOC handler carries.
 */
export const parseLetterDocumentNcc = (html: string): string | undefined => {
  const direct = /VerPdfWlpl\?ncc=([A-Za-z0-9]+)/.exec(html)?.[1]
  if (direct) return direct
  const start = html.indexOf('OBTENERDOC')
  if (start < 0) return undefined
  return /ncc\W{1,4}(?:val\W{1,3})?([A-Za-z0-9]{6,})/.exec(
    html.slice(start, start + 1500),
  )?.[1]
}
