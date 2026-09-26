import { listJuntaPayments } from '../../gobex/listJuntaPayments'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta pagos [--ejercicio a]`: payments from the Junta de Extremadura to the holder. */
export const juntaPagos: Command = {
  portal: 'junta',
  action: 'pagos',
  description:
    'List what the Junta de Extremadura and its bodies paid or owe the holder in one year (subsidies, refunds), paid and pending (--ejercicio, default this year)',
  options: ['ejercicio'],
  run: async (client, options): Promise<unknown> =>
    listJuntaPayments(
      client,
      options['ejercicio'] ?? String(new Date().getFullYear()),
    ),
}
