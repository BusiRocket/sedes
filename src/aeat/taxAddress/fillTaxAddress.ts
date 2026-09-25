import { chooseStreet } from './chooseStreet'
import { tickWidget } from './tickWidget'
import { typeIntoWidget } from './typeIntoWidget'
import type { M036Session } from './types/M036Session'
import type { TaxAddressRequest } from './types/TaxAddressRequest'

/** Fill casilla 122 and the legal-entity fiscal address page; form state only, nothing is filed. */
export const fillTaxAddress = async (
  session: M036Session,
  request: TaxAddressRequest,
): Promise<void> => {
  await tickWidget(session, 'T1_MOD_DOMI_FISCAL_122')
  await typeIntoWidget(session, 'T1_LUGAR', request.lugar)
  await typeIntoWidget(session, 'T1_FIRMA_EN_CALIDAD', request.calidad)
  await typeIntoWidget(session, 'T1_FIRMADO', request.firmado)
  await chooseStreet(session, request)
  await typeIntoWidget(
    session,
    'IDEN_PJ_DOMI_FIS_TIPO_NUM_B13',
    request.tipoNumero,
  )
  await typeIntoWidget(session, 'IDEN_PJ_DOMI_FIS_NUM_CASA_B14', request.numero)
  if (request.complemento)
    await typeIntoWidget(
      session,
      'IDEN_PJ_DOMI_FIS_COMPLEMENTO_B21',
      request.complemento,
    )
  await typeIntoWidget(session, 'IDEN_PJ_INDI_REF_CATASTRAL_DOMI_FIS_B39', '1')
  await typeIntoWidget(
    session,
    'IDEN_PJ_DOMI_FIS_REF_CATASTRAL_B30',
    request.referenciaCatastral.toUpperCase(),
  )
  await tickWidget(session, 'TITULARES_REALES_NO_VARIACION')
}
