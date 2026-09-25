/** The value of one attribute inside a single HTML tag, double or single quoted, or undefined. */
export const readAttribute = (
  tag: string,
  name: string,
): string | undefined => {
  const wanted = name.toLowerCase()
  for (const match of tag.matchAll(
    /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g,
  )) {
    const [, attribute, doubleQuoted, singleQuoted] = match
    if (attribute?.toLowerCase() === wanted)
      return doubleQuoted ?? singleQuoted ?? ''
  }
  return undefined
}
