import { downloadNotificationDocuments } from '../../dehu/documents/downloadNotificationDocuments'
import type { HttpClient } from '../../http/types/HttpClient'
import type { CliOptions } from '../types/CliOptions'
import type { Command } from '../types/Command'

export const dehuDocumentos: Command = {
  portal: 'dehu',
  action: 'documentos',
  description:
    "Download the document and voucher of the holder's realized notifications at DEHU into --out (reads only notifications already realized; none is opened)",
  options: ['year', 'id'],
  run: async (client: HttpClient, options: CliOptions): Promise<unknown> => {
    const outDir = options['out']
    if (!outDir) throw new Error('--out <dir> is required for dehu documentos')
    const rawYear = options['year']
    const year =
      rawYear === undefined ? new Date().getFullYear() : Number(rawYear)
    if (!Number.isInteger(year))
      throw new Error('--year must be a whole year number, e.g. 2026')
    const rawIds = options['id']
    const ids =
      rawIds === undefined
        ? undefined
        : rawIds
            .split(',')
            .map((id) => id.trim())
            .filter((id) => id !== '')
    return downloadNotificationDocuments(client, { year, ids }, outDir)
  },
}
