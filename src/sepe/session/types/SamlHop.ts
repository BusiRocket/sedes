/** One hop of the Cl@ve relay: where to POST and the fields to carry. */
export type SamlHop = {
  readonly url: string
  readonly fields: Readonly<Record<string, string>>
}
