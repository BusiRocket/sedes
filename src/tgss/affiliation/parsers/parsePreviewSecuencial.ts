/**
 * The sequence number of the generated informe: the `<PREVIEW>` marked
 * `IDEMBEDDED="Informe"` when the screen has one, otherwise the first PREVIEW.
 */
export const parsePreviewSecuencial = (xml: string): string | undefined => {
  const informe =
    /<PREVIEW[^>]*IDEMBEDDED="Informe"[^>]*SECUENCIAL="(\d+)"/.exec(xml)
  const first = /<PREVIEW[^>]*SECUENCIAL="(\d+)"/.exec(xml)
  return informe?.[1] ?? first?.[1]
}
