import { listNotifications } from '../../dehu/listNotifications'
import type { HttpClient } from '../../http/HttpClient'
import type { CliOptions } from '../CliOptions'
import type { Command } from '../Command'

/** `sedes dehu list`: the holder's pending and realized DEHU notifications, listing only. */
export const dehuList: Command = {
  portal: 'dehu',
  action: 'list',
  description:
    "List the holder's pending and realized notifications at DEHU without opening any (opening a notification is a legal act and is not offered)",
  options: ['state', 'year'],
  run: async (client: HttpClient, options: CliOptions): Promise<unknown> => {
    const rawState = options['state'] ?? 'pending'
    if (rawState !== 'pending' && rawState !== 'realized' && rawState !== 'all')
      throw new Error('--state must be one of pending, realized, all')
    const rawYear = options['year']
    if (rawYear === undefined && rawState !== 'pending')
      throw new Error('--year is required for --state realized or --state all')
    const year = rawYear === undefined ? undefined : Number(rawYear)
    if (year !== undefined && !Number.isInteger(year))
      throw new Error('--year must be a whole year number, e.g. 2026')
    return listNotifications(client, { state: rawState, year })
  },
}
