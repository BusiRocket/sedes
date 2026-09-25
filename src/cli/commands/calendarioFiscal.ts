import { readFiscalCalendar } from '../../tools/calendar/readFiscalCalendar'
import type { Command } from '../types/Command'

export const calendarioFiscal: Command = {
  portal: 'calendario',
  action: 'fiscal',
  description:
    'AEAT filing and direct-debit deadlines falling in one calendar year, optionally for one --modelo and --periodo, from verified AEAT pages only',
  options: ['ejercicio', 'modelo', 'periodo'],
  needsCertificate: false,
  run: async (_client, options): Promise<unknown> => {
    const ejercicio = options['ejercicio']
    if (!ejercicio || !/^\d{4}$/.test(ejercicio))
      throw new Error('--ejercicio is required as a four-digit year')
    return Promise.resolve(
      readFiscalCalendar({
        ejercicio: Number(ejercicio),
        modelo: options['modelo'],
        periodo: options['periodo'],
      }),
    )
  },
}
