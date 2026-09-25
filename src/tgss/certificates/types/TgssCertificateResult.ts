import type { CertificateKind } from './CertificateKind'

/** The JSON `papeleo tgss corriente` prints. */
export type TgssCertificateResult = {
  readonly nif: string
  readonly kind: CertificateKind
  readonly label: string
  readonly issued: boolean
  /** The portal's message when it declined (not up to date, no CCC/NAF, daily cap). */
  readonly message?: string | undefined
  readonly pdfPath?: string | undefined
  readonly bytes?: number | undefined
  readonly notes: readonly string[]
}
