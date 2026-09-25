/** One row of the AEAT sede's own notification list (GNNO-JDIT), as printed. */
export type AeatNotification = {
  /** The notification id the portal calls `ncc`; `--id` takes it. */
  readonly ncc: string
  readonly concepto: string
  readonly tipo: string
  readonly titular: string
  readonly destinatario: string
  /** ISO date the notification was issued. */
  readonly fechaEmision: string
  /** ISO date it was notified (accessed or expired), empty while pending. */
  readonly fechaNotificacion: string
  readonly modo: string
  /** False while nobody has appeared (comparecido): opening it starts the legal deadlines. */
  readonly leida: boolean
}
