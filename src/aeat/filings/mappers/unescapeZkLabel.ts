/** Decode a ZK combo label as the page escapes it: `\'`, `\xNN` and `\uNNNN`. */
export const unescapeZkLabel = (raw: string): string =>
  raw
    .replaceAll(/\\u([0-9A-Fa-f]{4})/g, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replaceAll(/\\x([0-9A-Fa-f]{2})/g, (_, hex: string) =>
      String.fromCodePoint(Number.parseInt(hex, 16)),
    )
    .replaceAll("\\'", "'")
    .trim()
