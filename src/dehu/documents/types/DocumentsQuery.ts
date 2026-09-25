/** Which realized notifications to download: a year, optionally narrowed to identifiers. */
export type DocumentsQuery = {
  readonly year: number
  readonly ids?: readonly string[] | undefined
}
