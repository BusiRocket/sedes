import type { StaDatasets } from '../types/StaDatasets'
import type { StaNotification } from '../types/StaNotification'
import { mapNotification } from './mapNotification'
import { notificationScope } from './notificationScope'

/** Every notification in a set of datasets, tagged with role and tab from each dataset's name. */
export const notificationsFromDatasets = (
  datasets: StaDatasets,
): StaNotification[] =>
  Object.entries(datasets).flatMap(([name, rows]) => {
    const scope = notificationScope(name)
    return scope ? rows.map((row) => mapNotification(row, scope)) : []
  })
