import type { CentsSplit } from '../types/CentsSplit'

/** 123456 -> `{ euros: '1234', decimals: '56' }`. */
export const splitCents = (cents: number): CentsSplit => ({
  euros: String(Math.trunc(cents / 100)),
  decimals: String(cents % 100).padStart(2, '0'),
})
