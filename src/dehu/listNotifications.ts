import type { HttpClient } from '../http/HttpClient'
import { fetchPendingNotifications } from './fetchPendingNotifications'
import { fetchRealizedNotifications } from './fetchRealizedNotifications'
import type { ListQuery } from './ListQuery'
import type { ListState } from './ListState'
import { loginWithCertificate } from './loginWithCertificate'
import type { Notification } from './Notification'

/**
 * Log in with the holder's certificate and list pending and/or realized DEHU
 * notifications. Read-only: it never opens (compareces) any of them.
 */
export const listNotifications = async (
  client: HttpClient,
  query: ListQuery,
): Promise<{
  readonly state: ListState
  readonly notifications: readonly Notification[]
  readonly count: number
  readonly pages: number
}> => {
  const { state, year } = query
  if (state !== 'pending' && year === undefined)
    throw new Error('--year is required for state=realized or state=all')
  const authData = await loginWithCertificate(client)
  let notifications: readonly Notification[] = []
  let pages = 0
  if (state === 'pending' || state === 'all') {
    const pending = await fetchPendingNotifications(client, authData)
    notifications = [...notifications, ...pending.notifications]
    pages += pending.pages
  }
  if ((state === 'realized' || state === 'all') && year !== undefined) {
    const realized = await fetchRealizedNotifications(client, authData, year)
    notifications = [...notifications, ...realized.notifications]
    pages += realized.pages
  }
  return { state, notifications, count: notifications.length, pages }
}
