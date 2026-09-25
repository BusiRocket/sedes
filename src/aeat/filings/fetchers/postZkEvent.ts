import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'
import type { ZkEvent } from '../types/ZkEvent'

/**
 * Send one ZK client event to `zkau`. The field order (`dtid`, `cmd_0`,
 * `uuid_0`, `data_0`) is the browser's own, and the page URL travels as
 * referer.
 */
export const postZkEvent = async (
  client: HttpClient,
  desktopId: string,
  event: ZkEvent,
): Promise<string> => {
  const response = await client.request(`${aeatBaseUrl}/wlpl/SCEJ-MANT/zkau`, {
    method: 'POST',
    form: {
      dtid: desktopId,
      cmd_0: event.cmd,
      uuid_0: event.uuid,
      data_0: JSON.stringify(event.data),
    },
    referer: `${aeatBaseUrl}/wlpl/SCEJ-MANT/CONSUL/index.zul`,
  })
  return response.text
}
