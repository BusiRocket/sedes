import { describe, expect, it } from 'vitest'

import { fileSuffixFromName } from './fileSuffixFromName'

describe('fileSuffixFromName', () => {
  it('keeps a short extension, lower-cased', () => {
    expect(fileSuffixFromName('Resguardo.PDF')).toBe('pdf')
    expect(fileSuffixFromName('acto.zip')).toBe('zip')
  })

  it('falls back to pdf when the name has no usable extension', () => {
    expect(fileSuffixFromName(undefined)).toBe('pdf')
    expect(fileSuffixFromName('')).toBe('pdf')
    expect(fileSuffixFromName('sin-extension')).toBe('pdf')
    expect(fileSuffixFromName('a.documento')).toBe('pdf')
  })
})
