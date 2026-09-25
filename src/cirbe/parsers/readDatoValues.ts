import { unescapeHtml } from '../../html/unescapeHtml'

/** Every value of the IAS `<Dato Nombre="name">` elements, unescaped and trimmed, in document order. */
export const readDatoValues = (xml: string, name: string): string[] =>
  [...xml.matchAll(/Nombre="([^"]+)">([^<]*)</g)]
    .filter((match) => match[1] === name)
    .map((match) => unescapeHtml(String(match[2])).trim())
