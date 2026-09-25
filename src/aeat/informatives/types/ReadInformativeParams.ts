import type { HttpClient } from '../../../http/types/HttpClient'
import type { InformativeFiling } from './InformativeFiling'
import type { InformativesQuery } from './InformativesQuery'

export type ReadInformativeParams = {
  readonly client: HttpClient
  readonly nif: string
  readonly query: InformativesQuery
  readonly filing: InformativeFiling
  readonly outDir: string | undefined
}
