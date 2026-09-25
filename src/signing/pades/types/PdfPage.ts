import type { PdfDict } from './PdfDict'
import type { PdfRef } from './PdfRef'

/** A page object and the reference that names it. */
export type PdfPage = { readonly ref: PdfRef; readonly dict: PdfDict }
