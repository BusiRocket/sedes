import { describe, expect, it } from 'vitest'

import { pdfArray } from '../objects/pdfArray'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { parseXrefStreamEntries } from './parseXrefStreamEntries'

const numbers = (values: number[]) =>
  pdfArray(values.map((value) => pdfRaw(String(value))))

describe('parseXrefStreamEntries', () => {
  it('lays rows out by /Index', () => {
    const dict = pdfDict([
      ['W', numbers([1, 1, 1])],
      ['Index', numbers([3, 1, 7, 1])],
    ])
    const entries = parseXrefStreamEntries(
      dict,
      Buffer.from([1, 20, 0, 0, 0, 0]),
    )
    expect([...entries]).toEqual([
      [3, { type: 'offset', offset: 20 }],
      [7, { type: 'free' }],
    ])
  })

  it('defaults /Index to [0 Size]', () => {
    const dict = pdfDict([
      ['W', numbers([1, 1, 1])],
      ['Size', pdfRaw('1')],
    ])
    expect(parseXrefStreamEntries(dict, Buffer.from([2, 4, 1])).get(0)).toEqual(
      {
        type: 'compressed',
        stream: 4,
        index: 1,
      },
    )
  })
})
