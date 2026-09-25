import type { TaxAddressRequest } from '../types/TaxAddressRequest'
import { isLegalEntityNif } from './isLegalEntityNif'

/** Every reason the 036 options cannot be filed as given; empty means valid. */
export const taxAddressProblems = (
  request: TaxAddressRequest,
): readonly string[] => {
  const checks: readonly (readonly [boolean, string])[] = [
    [
      isLegalEntityNif(request.nif),
      `--nif ${request.nif} is not a legal entity: only the persona jurídica 036 page (IDEN_PJ_*) has been captured.`,
    ],
    [
      /^\d{5}$/.test(request.codigoPostal),
      '--codigo-postal must be five digits.',
    ],
    [request.via.trim() !== '', '--via is required.'],
    [request.tipoNumero.trim() !== '', '--tipo-numero must not be empty.'],
    [request.numero.trim() !== '', '--numero is required.'],
    [
      /^[0-9A-Z]{20}$/.test(request.referenciaCatastral.toUpperCase()),
      '--referencia-catastral must be 20 letters or digits.',
    ],
    [request.lugar.trim() !== '', '--lugar is required.'],
    [request.firmado.trim() !== '', '--firmado is required.'],
    [request.calidad.trim() !== '', '--calidad is required.'],
  ]
  return checks.filter(([ok]) => !ok).map(([, message]) => message)
}
