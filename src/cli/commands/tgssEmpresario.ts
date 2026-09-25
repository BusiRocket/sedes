import { emitNegativeEmployerReport } from '../../tgss/affiliation/emitNegativeEmployerReport'
import type { Command } from '../types/Command'

export const tgssEmpresario: Command = {
  portal: 'tgss',
  action: 'empresario',
  description:
    "Emit and download the holder's 'informe negativo de inscripción de empresario' at the Seguridad Social",
  options: [],
  run: async (client, options): Promise<unknown> =>
    emitNegativeEmployerReport(client, options['out']),
}
