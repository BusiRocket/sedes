/**
 * One Informes de Afiliación (INAF) report to emit. Without `action` the
 * entry screen already carries the informe; with it, that button is pressed
 * with `fields` first.
 */
export type AffiliationReportRequest = {
  readonly app: string
  readonly kind: string
  readonly action?: string | undefined
  readonly fields?: Readonly<Record<string, string>> | undefined
  readonly notes: readonly string[]
}
