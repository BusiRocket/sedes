import { describe, expect, it } from 'vitest'

import { buildStampContent } from './buildStampContent'

describe('buildStampContent', () => {
  const date = new Date('2026-09-26T08:07:06Z')

  it('draws the signer, date and reason', () => {
    const text = buildStampContent({
      commonName: 'ANA',
      date,
      reason: 'Conforme',
    }).toString('latin1')
    expect(text).toContain('(Firmado por ANA) Tj')
    expect(text).toContain('(Fecha: 2026-09-26 08:07:06 UTC) Tj')
    expect(text).toContain('(Motivo: Conforme) Tj')
  })

  it('omits the reason line when there is none', () => {
    expect(
      buildStampContent({ commonName: 'ANA', date }).toString('latin1'),
    ).not.toContain('Motivo')
  })
})
