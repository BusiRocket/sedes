import { describe, expect, it } from 'vitest'

import { mapCeusDocumentType } from './mapCeusDocumentType'

describe('mapCeusDocumentType', () => {
  it.each([
    ['1006', 'Comunicación'],
    ['1010', 'Justificante'],
    ['1008', 'Otros'],
  ])('labels %s as %s', (code, label) => {
    expect(mapCeusDocumentType(code)).toBe(label)
  })

  it('refuses an unknown code', () => {
    expect(() => mapCeusDocumentType('9999')).toThrow(
      /unknown CEUS document type/,
    )
  })
})
