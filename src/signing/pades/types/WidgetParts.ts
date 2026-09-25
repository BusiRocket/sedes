import type { PdfRef } from './PdfRef'

/** The references and geometry a signature widget points at. */
export type WidgetParts = {
  readonly signature: PdfRef
  readonly page: PdfRef
  readonly fieldName: string
  /** The stamp's rectangle and appearance, absent for an invisible signature. */
  readonly stamp?:
    | { readonly rect: readonly number[]; readonly appearance: PdfRef }
    | undefined
}
