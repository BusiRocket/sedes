/** One expediente from the STA "Mis expedientes" page. */
export type StaExpediente = {
  readonly number: string
  readonly archived: boolean
  readonly openedOn: string
  readonly registeredOn: string
  readonly registryEntry: string
  readonly procedure: string
  readonly requestType: string
  readonly phase: string
  readonly status: string
  readonly description: string
  readonly holder: string
}
