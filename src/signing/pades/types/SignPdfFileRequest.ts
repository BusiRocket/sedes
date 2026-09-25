import type { SignPdfOptions } from './SignPdfOptions'

/** Sign the PDF at `input` into `output`. */
export type SignPdfFileRequest = {
  readonly input: string
  readonly output: string
  readonly options: SignPdfOptions
}
