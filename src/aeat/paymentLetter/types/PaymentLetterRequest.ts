/** A modelo 010 carta de pago for part or all of one debt. */
export type PaymentLetterRequest = {
  readonly nif: string
  /** The liquidación key as the debt list prints it (`--clave`). */
  readonly clave: string
  /** The amount as the holder typed it, `n,nn` with an optional `.` thousands separator. */
  readonly importe: string
  readonly outDir?: string | undefined
  readonly confirm: boolean
}
