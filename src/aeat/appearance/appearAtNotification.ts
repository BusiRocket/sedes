import type { HttpClient } from '../../http/types/HttpClient'
import { openAeatSession } from '../session/openAeatSession'
import { listPendingNotifications } from './listPendingNotifications'
import { performAppearance } from './performAppearance'
import { planAppearance } from './planAppearance'
import type { AppearancePlan } from './types/AppearancePlan'
import type { AppearanceRequest } from './types/AppearanceRequest'

/**
 * `aeat comparecer`: list the pending notifications (a read) and plan the
 * comparecencia; only with `confirm` and a pending `ncc` appear at it.
 */
export const appearAtNotification = async (
  client: HttpClient,
  request: AppearanceRequest,
  today: Date = new Date(),
): Promise<AppearancePlan> => {
  await openAeatSession(client)
  const pending = await listPendingNotifications(client, today)
  const { plan, notes } = planAppearance(pending, request)
  const action = `comparecer AEAT notification ${request.ncc ?? '(none chosen)'}`
  const ready = plan.length > 0 && notes.length === 0
  if (!request.confirm || !ready || !request.ncc)
    return { action, executed: false, plan, notes, pending }
  const receipt = await performAppearance(
    client,
    request.nif,
    request.ncc,
    request.outDir,
  )
  return { action, executed: true, plan, receipt, notes, pending }
}
