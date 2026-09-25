import { describe, expect, it } from 'vitest'

import { indirectObject } from './indirectObject'
import { pdfRaw } from './pdfRaw'

describe('indirectObject', () => {
  it('wraps the value in obj/endobj', () => {
    const object = indirectObject(5, 1, pdfRaw('true'))
    expect(object).toMatchObject({ num: 5, gen: 1 })
    expect(object.bytes.toString('latin1')).toBe('5 1 obj\ntrue\nendobj\n')
  })
})
