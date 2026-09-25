import { emitContributionsReport } from '../../tgss/contributions/emitContributionsReport'
import type { Command } from '../types/Command'

export const tgssBases: Command = {
  portal: 'tgss',
  action: 'bases',
  description:
    "Emit and download the holder's 'informe de bases y cuotas ingresadas' for one year at the Seguridad Social",
  options: ['ejercicio'],
  run: async (client, options): Promise<unknown> => {
    const ejercicio = options['ejercicio'] ?? String(new Date().getFullYear())
    return emitContributionsReport(client, { ejercicio }, options['out'])
  },
}
