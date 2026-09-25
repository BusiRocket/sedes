import { htmlToText } from '../../../html/htmlToText'
import { isoDateFromDashed } from '../mappers/isoDateFromDashed'
import type { AppearanceConfirmation } from '../types/AppearanceConfirmation'
import { readConcepto } from './readConcepto'

/** Concepto, fecha de notificación and the acuse CSV printed after the firma. */
export const parseAppearanceConfirmation = (
  html: string,
): AppearanceConfirmation => {
  const text = htmlToText(html)
  const fecha =
    /Fecha (?:de )?notificaci[oó]n:? (\d{2}[-/]\d{2}[-/]\d{4})/i.exec(text)?.[1]
  return {
    concepto: readConcepto(text),
    fechaNotificacion: fecha ? isoDateFromDashed(fecha) : undefined,
    csv: /CSV=([A-Z0-9]{8,})/.exec(html)?.[1],
  }
}
