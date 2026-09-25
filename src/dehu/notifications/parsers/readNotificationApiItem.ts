import { asRecord } from '../../api/asRecord'
import type { NotificationApiItem } from '../types/NotificationApiItem'

/** Validate one raw notification item, or undefined when a required field is missing or the wrong type. */
export const readNotificationApiItem = (
  raw: unknown,
): NotificationApiItem | undefined => {
  const record = asRecord(raw)
  if (!record) return undefined
  const identifier = record['identifier']
  const concept = record['concept']
  const emitterEntity = record['emitterEntity']
  const availabilityDate = record['availabilityDate']
  if (
    typeof identifier !== 'string' ||
    typeof concept !== 'string' ||
    typeof emitterEntity !== 'string' ||
    typeof availabilityDate !== 'string'
  )
    return undefined
  const nifTitular = record['nifTitular']
  const expirationDate = record['expirationDate']
  const state = record['state']
  return {
    identifier,
    concept,
    emitterEntity,
    availabilityDate,
    nifTitular: typeof nifTitular === 'string' ? nifTitular : undefined,
    expirationDate:
      typeof expirationDate === 'string' ? expirationDate : undefined,
    state: typeof state === 'string' ? state : undefined,
  }
}
