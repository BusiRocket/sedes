import type { AppearanceConfirmation } from './AppearanceConfirmation'

/** The comparecencia's receipt: what the portal confirmed and the files saved. */
export type AppearanceReceipt = AppearanceConfirmation & {
  readonly ncc: string
  /** The notified act (`accion=vernotif`), when --out was given. */
  readonly actoPath?: string | undefined
  /** The acuse de recibo resolved from its CSV, when --out was given. */
  readonly acusePath?: string | undefined
}
