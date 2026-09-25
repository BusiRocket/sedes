import { toNotification } from '../mappers/toNotification'
import type { Notification } from '../types/Notification'
import { notificationApiItems } from './notificationApiItems'

/** Map one page of the pending-notifications API response to notifications, all in the `pending` state. */
export const parsePendingNotificationPage = (
  json: unknown,
): readonly Notification[] =>
  notificationApiItems(json).map((item) =>
    toNotification(item, { state: 'pending', expiresAt: item.expirationDate }),
  )
