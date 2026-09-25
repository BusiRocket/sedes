import type { HttpClient } from '../../../http/types/HttpClient'
import type { DocumentKind } from './DocumentKind'

/** Everything one document GET needs: the session, the notification's sent reference and which file. */
export type FileDownloadRequest = {
  readonly client: HttpClient
  readonly authData: string
  readonly reference: string
  readonly kind: DocumentKind
}
