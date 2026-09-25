import type { PdfRef } from './PdfRef'
import type { PdfUpdateObject } from './PdfUpdateObject'

/** The appearance XObject and font of a visible stamp, and where the widget sits. */
export type StampObjects = {
  readonly rect: readonly number[]
  readonly appearance: PdfRef
  readonly objects: readonly PdfUpdateObject[]
}
