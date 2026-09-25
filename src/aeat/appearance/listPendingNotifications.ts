import type { HttpClient } from '../../http/types/HttpClient'
import { fetchNotificationList } from './fetchers/fetchNotificationList'
import { filterForYear } from './mappers/filterForYear'
import { parseNotificationRows } from './parsers/parseNotificationRows'
import type { AeatNotification } from './types/AeatNotification'

/** The unread notifications of the last twelve months: a read, nothing is opened. */
export const listPendingNotifications = async (
  client: HttpClient,
  today: Date,
): Promise<readonly AeatNotification[]> =>
  parseNotificationRows(
    await fetchNotificationList(client, filterForYear('unread', today)),
  ).filter((row) => !row.leida)
