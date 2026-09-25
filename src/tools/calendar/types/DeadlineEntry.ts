import type { FilingWindow } from './FilingWindow'

/** One modelo and period in the answer of `papeleo calendario fiscal`. */
export type DeadlineEntry = {
  readonly modelo: string
  readonly descripcion: string
  readonly periodo: string
  readonly ejercicioDevengo: number
  readonly presentacion: FilingWindow
  readonly domiciliacion?: FilingWindow | undefined
  readonly regla: string
}
