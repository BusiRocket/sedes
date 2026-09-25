import type { HttpClient } from '../../../http/types/HttpClient'
import { zkClickData } from '../mappers/zkClickData'
import { parseCsvCode } from '../parsers/parseCsvCode'
import { postZkEvent } from './postZkEvent'

/** Click a row's "Ver" button and read the CSV of the receipt it opens. */
export const fetchFilingCsv = async (
  client: HttpClient,
  desktopId: string,
  verUuid: string,
): Promise<string | undefined> =>
  parseCsvCode(
    await postZkEvent(client, desktopId, {
      cmd: 'onClick',
      uuid: verUuid,
      data: zkClickData,
    }),
  )
