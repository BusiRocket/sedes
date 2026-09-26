import { formatSlashDate } from '../../gobex/formatters/formatSlashDate'
import { listJuntaCarpetaExpedientes } from '../../gobex/listJuntaCarpetaExpedientes'
import type { Command } from '../types/Command'

/** `ventanilla-unica junta carpeta-expedientes [--desde d] [--hasta d]`: expedientes in the Junta's Carpeta Ciudadana. */
export const juntaCarpetaExpedientes: Command = {
  portal: 'junta',
  action: 'carpeta-expedientes',
  description:
    'List the expedientes in the Junta de Extremadura Carpeta Ciudadana started in a date range (--desde and --hasta DD/MM/AAAA, default the last 365 days), swept 30 days at a time',
  options: ['desde', 'hasta'],
  run: async (client, options): Promise<unknown> => {
    const today = new Date()
    const yearAgo = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 365,
    )
    return listJuntaCarpetaExpedientes(client, {
      desde: options['desde'] ?? formatSlashDate(yearAgo),
      hasta: options['hasta'] ?? formatSlashDate(today),
    })
  },
}
