/** An HTML form reduced to what a replay needs: its absolute action and its input name/value pairs. */
export type HtmlForm = {
  readonly action: string
  readonly fields: Readonly<Record<string, string>>
}
