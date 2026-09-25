import { describe, expect, it } from 'vitest'

import { buildTestIdentity } from '../../fixtures/buildTestIdentity'
import { selectCommonName } from './selectCommonName'

describe('selectCommonName', () => {
  it('reads the signer CN', () => {
    expect(selectCommonName(buildTestIdentity('PEREZ JUAN - 00000000T'))).toBe(
      'PEREZ JUAN - 00000000T',
    )
  })

  it('falls back to the whole subject without a CN', () => {
    expect(selectCommonName(buildTestIdentity('ACME SL', '2.5.4.10'))).toBe(
      'O=ACME SL',
    )
  })
})
