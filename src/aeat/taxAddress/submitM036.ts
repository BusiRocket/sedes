import { clickUuid } from './clickUuid'
import { dispatchM036Event } from './dispatchM036Event'
import { findButtonUuid } from './parsers/findButtonUuid'
import { findWidgetUuid } from './parsers/findWidgetUuid'
import { parsePresenvaliPayload } from './parsers/parsePresenvaliPayload'
import { parseTaxAddressReceipt } from './parsers/parseTaxAddressReceipt'
import { tickWidget } from './tickWidget'
import type { M036Session } from './types/M036Session'
import type { TaxAddressReceipt } from './types/TaxAddressReceipt'
import { blockingM036Errors } from './validators/blockingM036Errors'

/** THE ACT: "Firmar y Enviar", accept the submission and echo `onPresenvali`. */
export const submitM036 = async (
  session: M036Session,
): Promise<TaxAddressReceipt> => {
  const signed = await clickUuid(
    session,
    findButtonUuid(session.html, 'Firmar y Enviar'),
  )
  const errors = blockingM036Errors(signed)
  if (errors) throw new Error(`AEAT: the 036 refused the signature (${errors})`)
  await tickWidget(session, 'chAceptar')
  const accepted = await clickUuid(
    session,
    findWidgetUuid(session.blobs, 'btnAceptarEnvio'),
  )
  const presented = await dispatchM036Event(session, {
    cmd: 'onPresenvali',
    uuid: findWidgetUuid(session.blobs, 'ventanaPrincipal'),
    data: parsePresenvaliPayload(accepted),
  })
  return parseTaxAddressReceipt(presented)
}
