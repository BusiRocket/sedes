/** The result grid of a search: one expediente and its first "Ver" button per row. */
export type ResultRows = {
  readonly expedientes: readonly string[]
  readonly verButtons: readonly string[]
}
