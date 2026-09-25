import type { CensalCertificateRequest } from '../types/CensalCertificateRequest'
import type { FormFieldPair } from '../types/FormFieldPair'

/**
 * The confirmation form with the three "firma básica" fields filled in. The
 * portal calls this a signature; it is certificate authentication plus the
 * holder's NIF and name typed into the form, nothing is signed locally.
 */
export const withSignatureFields = (
  pairs: readonly FormFieldPair[],
  request: CensalCertificateRequest,
): readonly FormFieldPair[] => {
  const overrides: Readonly<Record<string, string>> = {
    FIRNIF: request.nif,
    FIRNOMBRE: request.nombre,
    FIR: 'FirmaBasica',
  }
  return pairs.map(([name, value]) => [name, overrides[name] ?? value])
}
