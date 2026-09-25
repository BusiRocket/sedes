import type { ContributionsPage } from './ContributionsPage'

/** What `sedes tgss bases` prints. */
export type ContributionsReportResult = {
  readonly holder?: string | undefined
  readonly nif?: string | undefined
  readonly naf?: string | undefined
  readonly ejercicio: string
  readonly regimenes: readonly ContributionsPage[]
  readonly messages: readonly string[]
  readonly secuencial?: string | undefined
  readonly pdfPath?: string | undefined
  readonly bytes?: number | undefined
  readonly notes: readonly string[]
}
