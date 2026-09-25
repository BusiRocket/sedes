import { postM036Event } from './fetchers/postM036Event'
import type { M036Event } from './types/M036Event'
import type { M036Session } from './types/M036Session'

/** Send one event on the open 036 desktop and keep its answer for later widget lookups. */
export const dispatchM036Event = async (
  session: M036Session,
  event: M036Event,
): Promise<string> => {
  const text = await postM036Event(session.client, session.desktopId, event)
  session.blobs.push(text)
  return text
}
