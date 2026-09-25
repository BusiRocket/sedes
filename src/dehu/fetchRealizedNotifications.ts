import type { HttpClient } from '../http/HttpClient'
import { apiHeaders } from './apiHeaders'
import { dehuUrls } from './dehuUrls'
import type { Notification } from './Notification'
import { parseJsonResponse } from './parseJsonResponse'
import { parseRealizedNotificationPage } from './parseRealizedNotificationPage'
import { realizedMonthWindow } from './realizedMonthWindow'

/**
 * Read every realized notification of one calendar year. DEHU rejects any
 * date window wider than a month, so the year is swept one month at a time,
 * each paged until a short page ends it.
 */
export const fetchRealizedNotifications = async (
  client: HttpClient,
  authData: string,
  year: number,
): Promise<{
  readonly notifications: readonly Notification[]
  readonly pages: number
}> => {
  const pageSize = 100
  const notifications: Notification[] = []
  let pages = 0
  for (let month = 1; month <= 12; month += 1) {
    const window = realizedMonthWindow(year, month)
    for (let page = 1; ; page += 1) {
      const params = new URLSearchParams({
        'finalDate[left_date]': window.from,
        'finalDate[right_date]': window.to,
        page: String(page),
        limit: String(pageSize),
      })
      const response = await client.request(
        `${dehuUrls.realized}?${params.toString()}`,
        { headers: apiHeaders(authData), referer: dehuUrls.notificationsPage },
      )
      const parsed = parseRealizedNotificationPage(
        parseJsonResponse(response, `realized notifications ${window.from}`),
      )
      pages += 1
      notifications.push(...parsed)
      if (parsed.length < pageSize) break
    }
  }
  return { notifications, pages }
}
