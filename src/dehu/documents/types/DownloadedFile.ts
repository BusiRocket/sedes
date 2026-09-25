import type { DocumentKind } from './DocumentKind'

/**
 * One file of a notification after the download attempt: written to disk,
 * genuinely absent at the portal (404), or still not obtained after the
 * retry ladder.
 */
export type DownloadedFile = {
  readonly kind: DocumentKind
  readonly status: 'saved' | 'missing' | 'failed'
  readonly path?: string | undefined
  readonly bytes?: number | undefined
}
