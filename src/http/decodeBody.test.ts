import { deflateRawSync, gzipSync } from 'node:zlib'

import { describe, expect, it } from 'vitest'

import { decodeBody } from './decodeBody'

describe('decodeBody', () => {
  it('decodes with the declared charset', () => {
    const latin = Buffer.from([0x41, 0xf1, 0x6f, 0x20, 0xa4])
    expect(decodeBody(latin, 'text/html; charset=ISO-8859-15').text).toBe(
      'Año €',
    )
  })

  it('falls back to the caller default when no charset is declared', () => {
    const latin = Buffer.from([0x41, 0xf1, 0x6f])
    expect(decodeBody(latin, 'text/html', 'iso-8859-15').text).toBe('Año')
    expect(decodeBody(Buffer.from('ok'), undefined).text).toBe('ok')
  })

  it('inflates gzip and raw deflate bodies sent without a content encoding', () => {
    expect(decodeBody(gzipSync('<x>gz</x>'), 'text/html').text).toBe(
      '<x>gz</x>',
    )
    expect(decodeBody(deflateRawSync('<x>df</x>'), 'text/html').text).toBe(
      '<x>df</x>',
    )
  })

  it('returns the raw bytes for an unknown charset or a gzip header on plain text', () => {
    expect(
      decodeBody(Buffer.from('abc'), 'text/html; charset=x-nope').text,
    ).toBe('abc')
    const fakeGzip = Buffer.from([0x1f, 0x8b, 0x41])
    expect(decodeBody(fakeGzip, 'application/octet-stream').body).toEqual(
      fakeGzip,
    )
  })
})
