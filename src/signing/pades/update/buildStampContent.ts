import type { SignatureDetails } from '../types/SignatureDetails'
import { stampText } from './stampText'

/** The content stream of a 300 x 50 stamp: a frame, "Firmado por <CN>" and the UTC date. */
export const buildStampContent = (details: SignatureDetails): Buffer => {
  const when = `${details.date.toISOString().slice(0, 19).replace('T', ' ')} UTC`
  const lines = [
    'q 0.2 0.2 0.2 RG 0.5 w 0.5 0.5 299 49 re S Q',
    'BT /Helv 8 Tf 0 g 6 34 Td',
    `${stampText(`Firmado por ${details.commonName}`)} Tj`,
    `0 -12 Td ${stampText(`Fecha: ${when}`)} Tj`,
    ...(details.reason
      ? [`0 -12 Td ${stampText(`Motivo: ${details.reason}`)} Tj`]
      : []),
    'ET',
  ]
  return Buffer.from(lines.join('\n'), 'latin1')
}
