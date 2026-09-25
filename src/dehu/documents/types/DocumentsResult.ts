import type { DownloadedDocument } from './DownloadedDocument'

/** What `dehu documentos` prints. */
export type DocumentsResult = {
  readonly year: number
  readonly requested: number
  readonly downloaded: readonly DownloadedDocument[]
  readonly notes: readonly string[]
}
