import type { Notification } from './Notification'
import { notificationApiItems } from './notificationApiItems'
import { toNotification } from './toNotification'

/** Map one page of the pending-notifications API response to notifications, all in the `pending` state. */
export const parsePendingNotificationPage = (
  json: unknown,
): readonly Notification[] =>
  notificationApiItems(json).map((item) =>
    toNotification(item, { state: 'pending', expiresAt: item.expirationDate }),
  )
