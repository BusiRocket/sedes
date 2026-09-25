/** Year, tax form and period extracted from a debt's concepto, when present. */
export type ConceptFields = {
  readonly ejercicio?: string | undefined
  readonly modelo?: string | undefined
  readonly periodo?: string | undefined
}
