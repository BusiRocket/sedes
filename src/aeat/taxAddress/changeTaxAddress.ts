import type { HttpClient } from '../../http/types/HttpClient'
import type { WriteResult } from '../../write/types/WriteResult'
import { openAeatSession } from '../session/openAeatSession'
import { fillTaxAddress } from './fillTaxAddress'
import { openM036Form } from './openM036Form'
import { planTaxAddress } from './planTaxAddress'
import { pressM036Validation } from './pressM036Validation'
import { submitM036 } from './submitM036'
import type { TaxAddressReceipt } from './types/TaxAddressReceipt'
import type { TaxAddressRequest } from './types/TaxAddressRequest'
import { taxAddressProblems } from './validators/taxAddressProblems'

/**
 * `aeat domicilio`: validate the options and plan a modelo 036 change of
 * fiscal address offline; only with `confirm` open, fill, validate and file it.
 */
export const changeTaxAddress = async (
  client: HttpClient,
  request: TaxAddressRequest,
): Promise<WriteResult<TaxAddressReceipt>> => {
  const action = `file AEAT modelo 036: change the fiscal address of ${request.nif}`
  const plan = planTaxAddress(request)
  const notes = taxAddressProblems(request)
  if (!request.confirm || notes.length > 0)
    return { action, executed: false, plan, notes }
  await openAeatSession(client)
  const session = await openM036Form(client, request.nif)
  await fillTaxAddress(session, request)
  await pressM036Validation(session)
  const receipt = await submitM036(session)
  return { action, executed: true, plan, receipt, notes }
}
