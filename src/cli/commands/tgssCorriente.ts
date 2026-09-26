import { emitUpToDateCertificate } from '../../tgss/certificates/emitUpToDateCertificate'
import { validateCertificateKind } from '../../tgss/certificates/validators/validateCertificateKind'
import type { Command } from '../types/Command'

/** `ventanilla-unica tgss corriente --nif <NIF> --tipo <kind> [--out <dir>]`: emit a "certificado de estar al corriente". */
export const tgssCorriente: Command = {
  portal: 'tgss',
  action: 'corriente',
  description:
    "Emit and download a 'certificado de estar al corriente' at the Seguridad Social (--tipo generico|licitacion|subvenciones|articulo-42; each emission counts against the daily cap)",
  options: ['nif', 'tipo'],
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    if (!nif) throw new Error('--nif is required')
    const kind = validateCertificateKind(options['tipo'])
    return emitUpToDateCertificate(client, nif, kind, options['out'])
  },
}
