import type { TaxAddressRequest } from './types/TaxAddressRequest'

/** The steps a confirmed 036 would run; plan mode sends no request at all. */
export const planTaxAddress = (
  request: TaxAddressRequest,
): readonly string[] => [
  `GET BU36-M036/MOD036/index.zul: a fresh 036 for ${request.nif} (refused unless the form names it).`,
  `Tick casilla 122 and sign in ${request.lugar} as ${request.firmado} (${request.calidad}).`,
  `Street finder: ${request.codigoPostal}, "${request.via}" (must match exactly one street).`,
  `Address: ${request.tipoNumero} ${request.numero}${request.complemento ? `, ${request.complemento}` : ''}; referencia catastral ${request.referenciaCatastral.toUpperCase()}; beneficial owners unchanged.`,
  'Validar declaración: any AEAT error stops here, before the signature.',
  'Firmar y Enviar, accept the submission and echo onPresenvali: the 036 is filed and the fiscal address changes with effect at the AEAT.',
]
