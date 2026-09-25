import { dispatchM036Event } from './dispatchM036Event'
import { findWidgetUuid } from './parsers/findWidgetUuid'
import type { M036Session } from './types/M036Session'

/** Type `value` into the 036 text widget `widgetId` (one `onChange`). */
export const typeIntoWidget = async (
  session: M036Session,
  widgetId: string,
  value: string,
): Promise<string> =>
  dispatchM036Event(session, {
    cmd: 'onChange',
    uuid: findWidgetUuid(session.blobs, widgetId),
    data: { value, start: value.length },
  })
