import type { HttpClient } from '../../../http/types/HttpClient'

/** An open 036 form: its desktop and every answer so far, newest last, to resolve widgets from. */
export type M036Session = {
  readonly client: HttpClient
  readonly desktopId: string
  readonly html: string
  readonly blobs: string[]
}
