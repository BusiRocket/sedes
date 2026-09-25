import { describe, expect, it } from 'vitest'

import { readObjectAt } from './readObjectAt'

describe('readObjectAt', () => {
  it('reads a plain object', () => {
    expect(readObjectAt('1 0 obj\n<< /A 1 >>\nendobj', 0)).toEqual({
      value: { kind: 'dict', entries: [['A', { kind: 'raw', text: '1' }]] },
      dataStart: undefined,
    })
  })

  it('finds where stream data starts after LF or CRLF', () => {
    expect(readObjectAt('2 0 obj << >> stream\nabc', 0).dataStart).toBe(21)
    expect(readObjectAt('2 0 obj << >> stream\r\nabc', 0).dataStart).toBe(22)
  })

  it('refuses an offset without an object', () => {
    expect(() => readObjectAt('xref 0 1', 0)).toThrow(/no indirect object/)
  })
})
