import type { FlowState } from '../types/FlowState'
import { readDatoValues } from './readDatoValues'
import { readTag } from './readTag'

/** The WebFlow execution key and the IAS `IdUnico` a screen carries; throws on an answer that is not an IAS screen. */
export const readFlowState = (xml: string, step: string): FlowState => {
  const idUnico = readTag(xml, 'IdUnico')
  if (idUnico === undefined)
    throw new Error(
      `CIRBE: ${step} did not answer an IAS screen (WAF page or stale flow)`,
    )
  return { executionKey: readDatoValues(xml, 'flowExecutionKey')[0], idUnico }
}
