/** Every `<TEXTO>` the screen carries, whitespace collapsed, in document order. */
export const readXmlMessages = (xml: string): readonly string[] => {
  const pattern = /<TEXTO><!\[CDATA\[([\s\S]*?)\]\]><\/TEXTO>/g
  return [...xml.matchAll(pattern)].map((match) =>
    (match[1] ?? '').replaceAll(/\s+/g, ' ').trim(),
  )
}
