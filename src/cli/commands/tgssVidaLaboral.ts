import { emitVidaLaboral } from '../../tgss/affiliation/emitVidaLaboral'
import type { Command } from '../types/Command'

export const tgssVidaLaboral: Command = {
  portal: 'tgss',
  action: 'vida-laboral',
  description:
    "Emit and download the holder's 'informe de vida laboral acotado' at the Seguridad Social for a date range",
  options: ['desde', 'hasta'],
  run: async (client, options): Promise<unknown> => {
    const desde = options['desde']
    if (!desde) throw new Error('--desde is required (DD/MM/AAAA)')
    const today = new Date()
    const pad = (value: number): string => String(value).padStart(2, '0')
    const hasta =
      options['hasta'] ??
      `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${String(today.getFullYear())}`
    return emitVidaLaboral(client, { desde, hasta }, options['out'])
  },
}
