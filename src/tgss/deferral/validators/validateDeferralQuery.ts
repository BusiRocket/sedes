import type { DeferralQuery } from '../types/DeferralQuery'

/**
 * Check the options before any request. Only the guarantee exemption was
 * exercised (`seleccionGarantiasTP=t`, `seleccionGarantias=t`, debt under
 * 150.000 EUR); the other guarantee branches have no evidence yet. The
 * aplazamiento runs at most five years, so at most 60 monthly instalments.
 */
export const validateDeferralQuery = (
  options: Readonly<Record<string, string | undefined>>,
): DeferralQuery => {
  const nif = options['nif']?.trim().toUpperCase()
  const plazosText = options['plazos'] ?? ''
  const documento = options['documento']
  if (!nif) throw new Error('--nif is required')
  if (!/^\d+$/.test(plazosText))
    throw new Error('--plazos must be a whole number')
  const plazos = Number(plazosText)
  if (plazos < 1 || plazos > 60)
    throw new Error('--plazos must be between 1 and 60')
  if (options['garantia'] !== 'exenta')
    throw new Error(
      '--garantia supports only "exenta" (exención total, debt under 150.000 EUR): the other guarantee screens were never captured',
    )
  if (!documento)
    throw new Error('--documento is required (the SEPA mandate PDF)')
  return { nif, plazos, garantia: 'exenta', documento }
}
