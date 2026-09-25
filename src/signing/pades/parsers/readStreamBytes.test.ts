import { describe, expect, it } from 'vitest'

import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { pdfRefTo } from '../objects/pdfRefTo'
import { readStreamBytes } from './readStreamBytes'

describe('readStreamBytes', () => {
  const pdf = Buffer.from('stream\nabcdef\r\nendstream')

  it('trusts a direct /Length', () => {
    const dict = pdfDict([['Length', pdfRaw('3')]])
    expect(readStreamBytes(pdf, dict, 7).toString()).toBe('abc')
  })

  it('falls back to endstream for an indirect /Length', () => {
    const dict = pdfDict([['Length', pdfRefTo(9)]])
    expect(readStreamBytes(pdf, dict, 7).toString()).toBe('abcdef')
  })

  it('refuses a stream without endstream', () => {
    expect(() => readStreamBytes(Buffer.from('abc'), pdfDict([]), 0)).toThrow(
      /endstream/,
    )
  })

  it('trims a bare LF or nothing before endstream', () => {
    const lf = Buffer.from('abc\nendstream')
    expect(readStreamBytes(lf, pdfDict([]), 0).toString()).toBe('abc')
    expect(
      readStreamBytes(Buffer.from('abcendstream'), pdfDict([]), 0).toString(),
    ).toBe('abc')
  })
})
