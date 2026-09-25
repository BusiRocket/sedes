import { fetchNotificationFileWithRetry } from './fetchers/fetchNotificationFileWithRetry'
import { notificationFileName } from './mappers/notificationFileName'
import type { DownloadedFile } from './types/DownloadedFile'
import type { FileDownloadRequest } from './types/FileDownloadRequest'
import type { Sleep } from './types/Sleep'
import { writeNotificationFile } from './writeNotificationFile'

/**
 * Fetch one file of a realized notification with the retry ladder and write
 * it. A 404 is `missing`; anything the ladder did not turn into a 200 with
 * content is `failed`, never silently counted as saved.
 */
export const downloadNotificationFile = async (
  request: FileDownloadRequest,
  identifier: string,
  outDir: string,
  sleep: Sleep,
): Promise<DownloadedFile> => {
  const notFound = 404
  const { kind } = request
  const answer = await fetchNotificationFileWithRetry(request, sleep)
  if (answer.status === notFound) return { kind, status: 'missing' }
  if (answer.content === undefined) return { kind, status: 'failed' }
  const written = await writeNotificationFile(
    outDir,
    notificationFileName(identifier, kind, answer.name),
    answer.content,
  )
  return { kind, status: 'saved', path: written.path, bytes: written.bytes }
}
