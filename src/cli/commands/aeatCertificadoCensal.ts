import { emitCensalCertificate } from '../../aeat/census/emitCensalCertificate'
import type { Command } from '../types/Command'

export const aeatCertificadoCensal: Command = {
  portal: 'aeat',
  action: 'certificado-censal',
  description:
    "Emit the holder's 'certificado de situación censal' at the Agencia Tributaria (the PDF with --out; the same day answers the cached one)",
  options: ['nif', 'nombre'],
  run: async (client, options): Promise<unknown> => {
    const nif = options['nif']
    const nombre = options['nombre']
    if (!nif) throw new Error('--nif is required')
    if (!nombre)
      throw new Error('--nombre is required (the name as AEAT spells it)')
    return emitCensalCertificate(client, { nif, nombre }, options['out'])
  },
}
