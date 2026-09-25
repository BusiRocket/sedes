import { describe, expect, it } from 'vitest'

import { readRefTail } from './readRefTail'

describe('readRefTail', () => {
  it('reads `gen R` after a number', () => {
    expect(readRefTail({ text: ' 0 R', pos: 0 }, '12')).toEqual({
      kind: 'ref',
      num: 12,
      gen: 0,
    })
  })

  it('rewinds when no reference follows', () => {
    const cursor = { text: ' 5 6', pos: 0 }
    expect(readRefTail(cursor, '4')).toBeUndefined()
    expect(cursor.pos).toBe(0)
    expect(readRefTail({ text: ' /X', pos: 0 }, '4')).toBeUndefined()
    expect(readRefTail({ text: '', pos: 0 }, '4')).toBeUndefined()
  })
})
