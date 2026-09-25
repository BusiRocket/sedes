import { dispatchM036Event } from './dispatchM036Event'
import { findWidgetUuid } from './parsers/findWidgetUuid'
import type { M036Session } from './types/M036Session'

/** Tick the 036 checkbox `widgetId` (one `onCheck`). */
export const tickWidget = async (
  session: M036Session,
  widgetId: string,
): Promise<string> =>
  dispatchM036Event(session, {
    cmd: 'onCheck',
    uuid: findWidgetUuid(session.blobs, widgetId),
    data: { '': true },
  })
