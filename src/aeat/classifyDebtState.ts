import type { DebtState } from './DebtState'

/**
 * Classify a debt row: a deferral or an embargo in `situacion` beats the raw
 * `periodoRecaudacion`, which otherwise decides between voluntaria and ejecutiva.
 */
export const classifyDebtState = (
  periodoRecaudacion: string | undefined,
  situacion: string | undefined,
): DebtState => {
  const situacionLower = (situacion ?? '').toLowerCase()
  if (
    situacionLower.includes('aplazad') ||
    situacionLower.includes('fraccionad')
  )
    return 'aplazada'
  if (situacionLower.includes('embargo')) return 'embargo'
  if ((periodoRecaudacion ?? '').toLowerCase().startsWith('ejec'))
    return 'ejecutiva'
  return 'voluntaria'
}
