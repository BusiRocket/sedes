import { emitSituationCertificate } from '../../sepe/certificates/emitSituationCertificate'
import type { Command } from '../types/Command'

export const sepeCertificado: Command = {
  portal: 'sepe',
  action: 'certificado',
  description:
    "Emit and download the holder's 'certificado de situación' (unemployment benefits) at the SEPE as a PDF; --out is required",
  options: [],
  run: async (client, options): Promise<unknown> =>
    emitSituationCertificate(client, options['out']),
}
