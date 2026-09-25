import type { Notification } from './Notification'
import { notificationApiItems } from './notificationApiItems'
import { notificationStateFromRaw } from './notificationStateFromRaw'
import { toNotification } from './toNotification'

/** Map one page of the realized-notifications API response, translating each item's own state. */
export const parseRealizedNotificationPage = (
  json: unknown,
): readonly Notification[] =>
  notificationApiItems(json).map((item) =>
    toNotification(item, {
      state: notificationStateFromRaw(item.state),
      rawState: item.state,
    }),
  )
