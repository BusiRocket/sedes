/** A generated carta de pago: nothing is paid until a bank returns an NRC for it. */
export type PaymentLetterReceipt = {
  readonly clave: string
  readonly importe: string
  /** The 010 justificante (twelve digits and a letter) the bank asks for. */
  readonly justificante: string
  /** The carta de pago PDF, when --out was given. */
  readonly pdfPath?: string | undefined
}
