import type { DeadlineEntry } from '../types/DeadlineEntry'
import type { DeadlineGroup } from '../types/DeadlineGroup'

/** One entry per modelo and period of a group. */
export const mapGroupToEntries = (group: DeadlineGroup): DeadlineEntry[] =>
  group.modelos.flatMap((modelo) =>
    group.periodos.map((period) => ({
      modelo,
      descripcion: group.descripcion,
      periodo: period.periodo,
      ejercicioDevengo: period.ejercicioDevengo,
      presentacion: period.presentacion,
      ...(period.domiciliacion === undefined
        ? {}
        : { domiciliacion: period.domiciliacion }),
      regla: group.regla,
    })),
  )
