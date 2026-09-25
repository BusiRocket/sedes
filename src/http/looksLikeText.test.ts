import { deflateRawSync, deflateSync, gzipSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'
import { looksLikeText } from './looksLikeText'

describe('looksLikeText', () => {
  it('accepts JSON, HTML and short or empty bodies', () => {
    expect(looksLikeText(Buffer.from('{\n  "data": {}\n}'))).toBe(true)
    expect(looksLikeText(Buffer.from('<html>'))).toBe(true)
    expect(looksLikeText(Buffer.alloc(0))).toBe(true)
  })

  it('rejects compressed and binary bodies', () => {
    const plain = Buffer.from('<html><body>hello world</body></html>')
    expect(looksLikeText(gzipSync(plain))).toBe(false)
    expect(looksLikeText(deflateSync(plain))).toBe(false)
    expect(looksLikeText(deflateRawSync(plain))).toBe(false)
    expect(looksLikeText(Buffer.from('%PDF-1.4\n\u0000\u0001\u0002'))).toBe(
      false,
    )
  })
})
