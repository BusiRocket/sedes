import type { DownloadedFile } from './DownloadedFile'

/** The download outcome of one realized notification. */
export type DownloadedDocument = {
  readonly id: string
  readonly reference: string
  readonly files: readonly DownloadedFile[]
}
