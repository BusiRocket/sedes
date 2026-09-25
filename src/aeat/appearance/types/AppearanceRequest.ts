/** A comparecencia at the AEAT sede: whose, which notification, where the PDFs go. */
export type AppearanceRequest = {
  readonly nif: string
  /** The notification id (`ncc`); without it the plan lists the candidates. */
  readonly ncc?: string | undefined
  readonly outDir?: string | undefined
  readonly confirm: boolean
}
