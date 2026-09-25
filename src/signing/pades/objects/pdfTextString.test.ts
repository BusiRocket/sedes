import { describe, expect, it } from 'vitest'

import { pdfTextString } from './pdfTextString'

describe('pdfTextString', () => {
  it('escapes printable ASCII as a literal string', () => {
    expect(pdfTextString('a (b) \\c')).toBe('(a \\(b\\) \\\\c)')
  })

  it('writes anything else as UTF-16BE hex with a BOM', () => {
    expect(pdfTextString('Cáceres')).toBe('<FEFF004300E100630065007200650073>')
  })
})
