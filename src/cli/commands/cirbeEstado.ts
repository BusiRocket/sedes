import { readCirbeStatus } from '../../cirbe/status/readCirbeStatus'
import type { HttpClient } from '../../http/types/HttpClient'
import type { CliOptions } from '../types/CliOptions'
import type { Command } from '../types/Command'

export const cirbeEstado: Command = {
  portal: 'cirbe',
  action: 'estado',
  description:
    "List the holder's CIRBE risk report requests at the Banco de España; with --out, download the detailed and global PDFs of the latest resolved one",
  options: [],
  run: async (client: HttpClient, options: CliOptions): Promise<unknown> =>
    readCirbeStatus(client, options['out']),
}
