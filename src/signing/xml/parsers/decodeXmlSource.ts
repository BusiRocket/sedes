/**
 * Decode document bytes by the encoding its declaration names (UTF-8 when it
 * names none); `TextDecoder` drops a byte-order mark.
 */
export const decodeXmlSource = (bytes: Buffer): string => {
  const head = bytes.subarray(0, 200).toString('latin1')
  const declared = /^<\?xml[^>]*encoding\s*=\s*["']([\w.-]+)["']/.exec(
    head,
  )?.[1]
  const label = (declared ?? 'utf-8').toLowerCase()
  return new TextDecoder(label, { fatal: true }).decode(bytes)
}
