/** Decode the `\xNN`, `\uNNNN` and `\'` escapes of a single-quoted ZK string. */
export const unescapeJsString = (text: string): string =>
  text.replaceAll(
    /\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|[\s\S])/g,
    (_match, escape: string) =>
      escape.length > 1
        ? String.fromCodePoint(Number.parseInt(escape.slice(1), 16))
        : escape,
  )
