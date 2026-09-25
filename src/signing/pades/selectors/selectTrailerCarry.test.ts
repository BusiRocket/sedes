import { describe, expect, it } from 'vitest'

import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { selectTrailerCarry } from './selectTrailerCarry'

describe('selectTrailerCarry', () => {
  it('keeps /Root, /Info and /ID only', () => {
    const trailer = pdfDict([
      ['Size', pdfRaw('4')],
      ['Root', pdfRaw('1 0 R')],
      ['Info', pdfRaw('2 0 R')],
      ['ID', pdfRaw('[<A> <B>]')],
      ['Prev', pdfRaw('9')],
    ])
    expect(selectTrailerCarry(trailer).map(([key]) => key)).toEqual([
      'Root',
      'Info',
      'ID',
    ])
  })
})
