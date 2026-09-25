/** The text of the first `<tag>` element of an IAS answer, or undefined. */
export const readTag = (xml: string, tag: string): string | undefined =>
  [...xml.matchAll(/<([\w.]+)>([^<]*)/g)]
    .find((match) => match[1] === tag)?.[2]
    ?.trim()
