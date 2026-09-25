import { describe, expect, it } from 'vitest'

import { serializePdfValue } from '../objects/serializePdfValue'
import { parsePdfValue } from './parsePdfValue'

describe('parsePdfValue', () => {
  it('parses nested dictionaries, arrays and references', () => {
    const text =
      '<< /Kids [3 0 R 4 0 R] /Count 2 /Inner << /A (x) >> /N null >>'
    expect(serializePdfValue(parsePdfValue({ text, pos: 0 }))).toBe(
      '<< /Kids [3 0 R 4 0 R] /Count 2 /Inner << /A (x) >> /N null >>',
    )
  })

  it('keeps a lone number as raw', () => {
    expect(parsePdfValue({ text: '42', pos: 0 })).toEqual({
      kind: 'raw',
      text: '42',
    })
  })

  it('refuses the end of data', () => {
    expect(() => parsePdfValue({ text: '  ', pos: 0 })).toThrow(/end of data/)
  })
})
