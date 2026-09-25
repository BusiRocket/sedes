import type { PeriodDeadline } from './PeriodDeadline'

/** Modelos that share every deadline, with the rule the AEAT states for them. */
export type DeadlineGroup = {
  readonly modelos: readonly string[]
  readonly descripcion: string
  readonly regla: string
  readonly periodos: readonly PeriodDeadline[]
}
