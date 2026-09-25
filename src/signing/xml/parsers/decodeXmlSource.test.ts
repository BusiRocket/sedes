import { describe, expect, it } from 'vitest'

import { decodeXmlSource } from './decodeXmlSource'

describe('decodeXmlSource', () => {
  it('defaults to UTF-8 and drops a byte-order mark', () => {
    expect(decodeXmlSource(Buffer.from('﻿<a>ñ</a>', 'utf8'))).toBe('<a>ñ</a>')
  })
  it('honours the declared encoding', () => {
    const bytes = Buffer.from(
      '<?xml version="1.0" encoding="ISO-8859-1"?><a>ñ</a>',
      'latin1',
    )
    expect(decodeXmlSource(bytes)).toContain('<a>ñ</a>')
  })
  it('refuses bytes invalid in the encoding', () => {
    expect(() => decodeXmlSource(Buffer.from([0x3c, 0xff, 0x3e]))).toThrow()
  })
})
