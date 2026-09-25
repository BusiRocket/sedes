import { describe, expect, it } from 'vitest'

import { withSignatureFields } from './withSignatureFields'

describe('withSignatureFields', () => {
  it('fills the three firma basica fields and keeps the rest', () => {
    expect(
      withSignatureFields(
        [
          ['fProcedimiento', 'x'],
          ['FIRNIF', ''],
          ['FIRNOMBRE', ''],
          ['FIR', ''],
        ],
        { nif: 'B00000000', nombre: 'ACME SL' },
      ),
    ).toEqual([
      ['fProcedimiento', 'x'],
      ['FIRNIF', 'B00000000'],
      ['FIRNOMBRE', 'ACME SL'],
      ['FIR', 'FirmaBasica'],
    ])
  })
})
