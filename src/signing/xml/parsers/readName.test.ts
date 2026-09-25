import { describe, expect, it } from 'vitest'

import { readName } from './readName'

describe('readName', () => {
  it('reads a qualified name', () => {
    const cursor = { text: '<ds:Signature Id', position: 1 }
    expect(readName(cursor)).toBe('ds:Signature')
    expect(cursor.position).toBe(13)
  })
  it('accepts non-ASCII name characters', () => {
    expect(readName({ text: 'Facturación>', position: 0 })).toBe('Facturación')
  })
  it('fails when no name starts there', () => {
    expect(() => readName({ text: '1a', position: 0 })).toThrow(
      'expected a name',
    )
  })
})
