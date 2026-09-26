import type { StaRole } from './StaRole'

/** One registry entry (anotación) from the STA "Mis registros" page. */
export type StaRegistration = {
  readonly role: StaRole
  readonly number: string
  readonly registeredAt: string
  readonly unit: string
  readonly summary: string
}
