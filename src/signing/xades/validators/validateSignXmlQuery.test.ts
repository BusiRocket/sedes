import { describe, expect, it } from 'vitest'

import { validateSignXmlQuery } from './validateSignXmlQuery'

describe('validateSignXmlQuery', () => {
  it('requires distinct --in and --out', () => {
    expect(() => validateSignXmlQuery({ out: 'b' })).toThrow('--in is required')
    expect(() => validateSignXmlQuery({ in: 'a' })).toThrow('--out is required')
    expect(() => validateSignXmlQuery({ in: 'a', out: 'a' })).toThrow(
      '--out must differ from --in',
    )
  })
  it('answers the request with defaults', () => {
    expect(validateSignXmlQuery({ in: 'a', out: 'b' })).toEqual({
      input: 'a',
      output: 'b',
      mode: 'enveloped',
      policy: 'ninguna',
    })
  })
})
