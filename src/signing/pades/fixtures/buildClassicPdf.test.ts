import { describe, expect, it } from 'vitest'

import { buildClassicPdf } from './buildClassicPdf'

describe('buildClassicPdf', () => {
  it('points startxref at the xref table', () => {
    const text = buildClassicPdf().toString('latin1')
    const offset = Number(/startxref\n(\d+)/.exec(text)?.[1])
    expect(text.startsWith('xref', offset)).toBe(true)
  })
})
