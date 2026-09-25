import { htmlToText } from '../../../html/htmlToText'
import { isoDateFromDashed } from '../mappers/isoDateFromDashed'
import type { AeatNotification } from '../types/AeatNotification'

/** Every `filaNum` row of the GNNO-JDIT list; the empty-list notice yields none. */
export const parseNotificationRows = (
  html: string,
): readonly AeatNotification[] => {
  const rowPattern = /<tr\s[^>]*id='filaNum\d+'[^>]*>([\s\S]*?)<\/tr>/gi
  const cellPattern = /<td[^>]*>([\s\S]*?)<\/td>/gi
  const rows: AeatNotification[] = []
  for (const [, inner = ''] of html.matchAll(rowPattern)) {
    const ncc = /DetalleSede\?ncc=(\d+)/.exec(inner)?.[1]
    if (!ncc) continue
    const cells = [...inner.matchAll(cellPattern)].map(([, cell = '']) =>
      htmlToText(cell),
    )
    const cell = (index: number): string => cells[index] ?? ''
    rows.push({
      ncc,
      concepto: cell(1),
      tipo: cell(2),
      titular: cell(3),
      destinatario: cell(4),
      fechaEmision: isoDateFromDashed(cell(5)),
      fechaNotificacion: isoDateFromDashed(cell(6)),
      modo: cell(7),
      leida: /^s[ií]$/i.test(cell(8)),
    })
  }
  return rows
}
