import { describe, expect, it } from 'vitest'

import { pdfRaw } from './pdfRaw'
import { pdfRawNumber } from './pdfRawNumber'
import { pdfRefTo } from './pdfRefTo'

describe('pdfRawNumber', () => {
  it('reads integers and reals', () => {
    expect(pdfRawNumber(pdfRaw('42'))).toBe(42)
    expect(pdfRawNumber(pdfRaw('-1.5'))).toBe(-1.5)
    expect(pdfRawNumber(pdfRaw('.5'))).toBe(0.5)
  })

  it('answers undefined for anything else', () => {
    expect(pdfRawNumber(pdfRaw('/Name'))).toBeUndefined()
    expect(pdfRawNumber(pdfRefTo(1))).toBeUndefined()
    expect(pdfRawNumber(undefined)).toBeUndefined()
  })
})
