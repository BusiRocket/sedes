import { describe, expect, it } from 'vitest'

import { pdfDict } from './pdfDict'
import { pdfDictWith } from './pdfDictWith'
import { pdfRaw } from './pdfRaw'

describe('pdfDictWith', () => {
  const dict = pdfDict([
    ['A', pdfRaw('1')],
    ['B', pdfRaw('2')],
  ])

  it('replaces an existing key in place', () => {
    expect(
      pdfDictWith(dict, 'A', pdfRaw('9')).entries.map(([key, value]) => [
        key,
        value,
      ]),
    ).toEqual([
      ['A', pdfRaw('9')],
      ['B', pdfRaw('2')],
    ])
  })

  it('appends a new key and leaves the original alone', () => {
    expect(pdfDictWith(dict, 'C', pdfRaw('3')).entries).toHaveLength(3)
    expect(dict.entries).toHaveLength(2)
  })
})
