import type { HttpClient } from '../../http/types/HttpClient'
import { fetchRealizedNotifications } from '../notifications/fetchers/fetchRealizedNotifications'
import { loginWithCertificate } from '../session/loginWithCertificate'
import { defaultSleep } from './defaultSleep'
import { downloadOneNotification } from './downloadOneNotification'
import type { DocumentsQuery } from './types/DocumentsQuery'
import type { DocumentsResult } from './types/DocumentsResult'
import type { DownloadedDocument } from './types/DownloadedDocument'
import type { Sleep } from './types/Sleep'

/**
 * Download the document and the voucher of the year's realized notifications
 * (optionally only the identifiers asked for) into `outDir`. Realized means
 * already compareced, expired, rejected or served by edict: reading their
 * files changes nothing. Pending notifications are never touched. One and a
 * half seconds separate one notification from the next, as the portal's rate
 * limit demands.
 */
export const downloadNotificationDocuments = async (
  client: HttpClient,
  query: DocumentsQuery,
  outDir: string,
  sleep: Sleep = defaultSleep,
): Promise<DocumentsResult> => {
  const pacingMs = 1_500
  const authData = await loginWithCertificate(client)
  const realized = await fetchRealizedNotifications(
    client,
    authData,
    query.year,
  )
  const wanted = query.ids === undefined ? undefined : new Set(query.ids)
  const selected = realized.notifications.filter(
    (notification) => wanted === undefined || wanted.has(notification.id),
  )
  const notes = ['reads realized notifications only; none is opened']
  const downloaded: DownloadedDocument[] = []
  for (const [index, notification] of selected.entries()) {
    const reference = notification.reference
    if (reference === undefined) {
      notes.push(`${notification.id}: no sent reference, skipped`)
      continue
    }
    if (index > 0) await sleep(pacingMs)
    const item = { id: notification.id, reference }
    downloaded.push(
      await downloadOneNotification({ client, authData }, item, outDir, sleep),
    )
  }
  if (wanted !== undefined && selected.length < wanted.size)
    notes.push(
      `${String(wanted.size - selected.length)} requested identifier(s) not among the year's realized notifications`,
    )
  return { year: query.year, requested: selected.length, downloaded, notes }
}
