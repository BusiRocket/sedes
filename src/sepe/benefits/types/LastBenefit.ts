/**
 * The last recognised unemployment right as the SEPE screen states it.
 * `fields` are the screen's own inputs; `diasRestantes` is derived when the
 * day counts are numeric; `message` is the screen's text when it shows no
 * right at all.
 */
export type LastBenefit = {
  readonly fields: Readonly<Record<string, string>>
  readonly diasRestantes?: number
  readonly message?: string
  readonly notes: readonly string[]
}
