import { deflateSync } from 'node:zlib'

import { describe, expect, it } from 'vitest'

import { pdfArray } from '../objects/pdfArray'
import { pdfDict } from '../objects/pdfDict'
import { pdfRaw } from '../objects/pdfRaw'
import { decodeStreamData } from './decodeStreamData'

describe('decodeStreamData', () => {
  it('returns unfiltered data as is', () => {
    const raw = Buffer.from('x')
    expect(decodeStreamData(pdfDict([]), raw)).toBe(raw)
  })

  it('inflates FlateDecode, also inside a one-item array', () => {
    const packed = deflateSync(Buffer.from('hello'))
    const flate = pdfRaw('/FlateDecode')
    expect(
      decodeStreamData(pdfDict([['Filter', flate]]), packed).toString(),
    ).toBe('hello')
    expect(
      decodeStreamData(
        pdfDict([['Filter', pdfArray([flate])]]),
        packed,
      ).toString(),
    ).toBe('hello')
  })

  it('refuses other filters', () => {
    const dict = pdfDict([['Filter', pdfRaw('/LZWDecode')]])
    expect(() => decodeStreamData(dict, Buffer.alloc(0))).toThrow(
      /only FlateDecode/,
    )
  })

  it('refuses a stream that inflates past the cap', () => {
    const bomb = deflateSync(Buffer.alloc(65 * 1024 * 1024))
    const dict = pdfDict([['Filter', pdfRaw('/FlateDecode')]])
    expect(() => decodeStreamData(dict, bomb)).toThrow(RangeError)
  })
})
