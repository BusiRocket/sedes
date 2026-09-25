import type { ReportDocument } from '../types/ReportDocument'

/**
 * Where the screen put the report it generated: an informe announced as a
 * `<PREVIEW SECUENCIAL="n">` (`TYPEVIEW=INFORME`), or, when the service
 * attaches it instead, the first `<ATTACHMENT SECUENCIAL="n">`
 * (`TYPEVIEW=DOCUMENTO`). Undefined when the screen carries neither.
 */
export const parseReportDocument = (
  xml: string,
): ReportDocument | undefined => {
  const preview = /<PREVIEW[^>]*SECUENCIAL="(\d+)"/.exec(xml)?.[1]
  if (preview !== undefined) return { secuencial: preview, typeView: 'INFORME' }
  const attachment = /<ATTACHMENT[^>]*SECUENCIAL="(\d+)"/.exec(xml)?.[1]
  if (attachment !== undefined)
    return { secuencial: attachment, typeView: 'DOCUMENTO' }
  return undefined
}
