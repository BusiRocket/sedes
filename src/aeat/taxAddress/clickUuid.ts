import { zkClickData } from '../filings/mappers/zkClickData'
import { dispatchM036Event } from './dispatchM036Event'
import type { M036Session } from './types/M036Session'

/** Click the 036 widget already resolved to `uuid` (one `onClick`). */
export const clickUuid = async (
  session: M036Session,
  uuid: string,
): Promise<string> =>
  dispatchM036Event(session, { cmd: 'onClick', uuid, data: zkClickData })
