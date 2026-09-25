import { describe, expect, it } from 'vitest'

import { expectLiteral } from './expectLiteral'

describe('expectLiteral', () => {
  it('consumes the literal', () => {
    const cursor = { text: '<?xml', position: 0 }
    expectLiteral(cursor, '<?')
    expect(cursor.position).toBe(2)
  })
  it('fails on anything else', () => {
    expect(() => {
      expectLiteral({ text: 'x', position: 0 }, '<')
    }).toThrow('expected "<"')
  })
})
