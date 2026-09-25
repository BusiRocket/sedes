import type { FileDownloadRequest } from '../types/FileDownloadRequest'
import type { NotificationFileResponse } from '../types/NotificationFileResponse'
import type { Sleep } from '../types/Sleep'
import { fetchNotificationFile } from './fetchNotificationFile'

/**
 * The document endpoint throttles hard: a sweep starts answering 503 after
 * roughly nine documents in a row, and it answered 409 right after a
 * comparecencia. Both clear on a retry. 404 is final (older notifications
 * carry no voucher) and retrying it only burns the rate limit. The last
 * answer is returned when the ladder runs out, so the caller can name it.
 */
export const fetchNotificationFileWithRetry = async (
  request: FileDownloadRequest,
  sleep: Sleep,
): Promise<NotificationFileResponse> => {
  const retryWaitsMs = [0, 3_000, 8_000, 20_000, 45_000]
  const ok = 200
  const notFound = 404
  let last: NotificationFileResponse = { status: 0 }
  for (const wait of retryWaitsMs) {
    if (wait > 0) await sleep(wait)
    last = await fetchNotificationFile(request)
    if (last.status === ok && last.content !== undefined) return last
    if (last.status === notFound) return last
  }
  return last
}
