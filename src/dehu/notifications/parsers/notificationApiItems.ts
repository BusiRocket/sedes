import { asRecord } from '../../api/asRecord'
import type { NotificationApiItem } from '../types/NotificationApiItem'
import { readNotificationApiItem } from './readNotificationApiItem'

/** The validated `items` array of a DEHU notifications API response body; malformed entries are skipped. */
export const notificationApiItems = (
  json: unknown,
): readonly NotificationApiItem[] => {
  const rawItems = asRecord(json)?.['items']
  if (!Array.isArray(rawItems)) return []
  return rawItems
    .map((raw) => readNotificationApiItem(raw))
    .filter((item): item is NotificationApiItem => item !== undefined)
}
