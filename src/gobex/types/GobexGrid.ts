/** One Carpeta Ciudadana result grid: the rich-table id, its column titles and its rows as text. */
export type GobexGrid = {
  readonly id: string
  readonly headers: readonly string[]
  readonly rows: readonly (readonly string[])[]
}
