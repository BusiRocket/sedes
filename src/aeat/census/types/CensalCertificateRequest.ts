/** Who the "certificado de situación censal" is asked for, as AEAT spells it. */
export type CensalCertificateRequest = {
  readonly nif: string
  readonly nombre: string
}
