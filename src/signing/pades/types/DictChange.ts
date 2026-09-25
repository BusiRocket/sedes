import type { PdfDict } from './PdfDict'
import type { PdfUpdateObject } from './PdfUpdateObject'

/** The result of adding something to a dictionary's entry: the dictionary itself when it changed, plus objects rewritten or created elsewhere. */
export type DictChange = {
  readonly dict: PdfDict | undefined
  readonly objects: readonly PdfUpdateObject[]
}
