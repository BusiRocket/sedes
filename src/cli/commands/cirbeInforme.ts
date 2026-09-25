import { requestRiskReport } from '../../cirbe/report/requestRiskReport'
import type { HttpClient } from '../../http/types/HttpClient'
import type { CliOptions } from '../types/CliOptions'
import type { Command } from '../types/Command'

export const cirbeInforme: Command = {
  portal: 'cirbe',
  action: 'informe',
  description:
    "Ask the Banco de España for the holder's own CIRBE risk report (--nacimiento dd-mm-aaaa, --email for the ready notice); it resolves in 14 minutes to 2 hours, then `cirbe estado --out` downloads it",
  options: ['nacimiento', 'email'],
  effect: 'emit',
  run: async (client: HttpClient, options: CliOptions): Promise<unknown> => {
    const birthDate = options['nacimiento']
    const email = options['email']
    if (!birthDate || !email)
      throw new Error(
        '--nacimiento <dd-mm-aaaa> and --email <address> are required for cirbe informe',
      )
    return requestRiskReport(client, { birthDate, email })
  },
}
