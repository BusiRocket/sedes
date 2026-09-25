import { clickUuid } from './clickUuid'
import { findButtonUuid } from './parsers/findButtonUuid'
import type { M036Session } from './types/M036Session'
import { blockingM036Errors } from './validators/blockingM036Errors'

/** Press "Validar declaración"; any AEAT error stops before the signature. */
export const pressM036Validation = async (
  session: M036Session,
): Promise<void> => {
  const answer = await clickUuid(
    session,
    findButtonUuid(session.html, 'Validar declaraci'),
  )
  const errors = blockingM036Errors(answer)
  if (errors)
    throw new Error(
      `AEAT: the 036 did not validate (${errors}); nothing was filed`,
    )
}
