import { notificationStateFromRaw } from '../mappers/notificationStateFromRaw'
import { toNotification } from '../mappers/toNotification'
import type { Notification } from '../types/Notification'
import { notificationApiItems } from './notificationApiItems'

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
