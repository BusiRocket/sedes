import { deflateRawSync, deflateSync, gzipSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'
import { inflateUndeclared } from './inflateUndeclared'
import { maxBodyBytes } from './maxBodyBytes'

const text = '{\n  "data": { "importeActual": 169.48 },\n  "result": true\n}'

describe('inflateUndeclared', () => {
  it('returns pretty-printed JSON untouched instead of treating it as raw deflate', () => {
    const raw = Buffer.from(text, 'latin1')
    expect(inflateUndeclared(raw).toString('latin1')).toBe(text)
  })

  it('returns HTML untouched', () => {
    const raw = Buffer.from('<html><body>x</body></html>')
    expect(inflateUndeclared(raw)).toBe(raw)
  })

  it('inflates undeclared gzip, deflate and raw deflate bodies', () => {
    const plain = Buffer.from(text)
    expect(inflateUndeclared(gzipSync(plain)).toString()).toBe(text)
    expect(inflateUndeclared(deflateSync(plain)).toString()).toBe(text)
    expect(inflateUndeclared(deflateRawSync(plain)).toString()).toBe(text)
  })

  it('returns an empty or binary body untouched', () => {
    expect(inflateUndeclared(Buffer.alloc(0)).length).toBe(0)
    const pdf = Buffer.from([0x00, 0x01, 0x02, 0x03])
    expect(inflateUndeclared(pdf)).toBe(pdf)
  })

  it('leaves a stream that expands past the limit compressed', () => {
    const bomb = gzipSync(Buffer.alloc(maxBodyBytes + 1))
    expect(inflateUndeclared(bomb)).toBe(bomb)
  })
})
