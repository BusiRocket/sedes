import type { HttpClient } from '../../http/types/HttpClient'
import { fetchM036Form } from './fetchers/fetchM036Form'
import { parseM036DesktopId } from './parsers/parseM036DesktopId'
import type { M036Session } from './types/M036Session'

/** Open a fresh 036 desktop; refuses one that does not name `nif` anywhere. */
export const openM036Form = async (
  client: HttpClient,
  nif: string,
): Promise<M036Session> => {
  const html = await fetchM036Form(client)
  if (!html.toUpperCase().includes(nif.toUpperCase()))
    throw new Error(
      `AEAT: the 036 form did not open for --nif ${nif}; nothing was filled`,
    )
  return { client, desktopId: parseM036DesktopId(html), html, blobs: [html] }
}
