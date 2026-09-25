/** What the page after "firma básica" prints: the act is done at this point. */
export type AppearanceConfirmation = {
  readonly concepto?: string | undefined
  /** ISO date of notification, the day the legal deadlines start counting. */
  readonly fechaNotificacion?: string | undefined
  /** CSV of the acuse de recibo, resolvable at the cotejo service. */
  readonly csv?: string | undefined
}
