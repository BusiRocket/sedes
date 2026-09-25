/** Read one ProsaXMLData element, unwrapping a CDATA section if there is one. */
export const readXmlField = (xml: string, tag: string): string | undefined => {
  const open = `<${tag}>`
  const close = `</${tag}>`
  const start = xml.indexOf(open)
  if (start === -1) return undefined
  const end = xml.indexOf(close, start + open.length)
  if (end === -1) return undefined
  const raw = xml.slice(start + open.length, end).trim()
  const cdataOpen = '<![CDATA['
  const cdataClose = ']]>'
  if (raw.startsWith(cdataOpen) && raw.endsWith(cdataClose))
    return raw.slice(cdataOpen.length, raw.length - cdataClose.length).trim()
  return raw
}
