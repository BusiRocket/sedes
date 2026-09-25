import { describe, expect, it } from 'vitest'

import { findBalancedArrayEnd } from './findBalancedArrayEnd'

describe('findBalancedArrayEnd', () => {
  it('finds the closing bracket of a flat array', () => {
    const text = 'x = [1,2,3]; more'
    expect(findBalancedArrayEnd(text, 4)).toBe(text.indexOf(']'))
  })

  it('ignores brackets and semicolons written inside a quoted string', () => {
    const text = 'x = [{"otribdesc":"a]; b","n":1}]; more'
    expect(findBalancedArrayEnd(text, 4)).toBe(text.indexOf('}]') + 1)
  })

  it('honors an escaped quote inside a string without closing it early', () => {
    const text = String.raw`x = [{"a":"say \"hi\" ] here"}];`
    const arrayEnd = findBalancedArrayEnd(text, 4)
    expect(text[arrayEnd]).toBe(']')
    expect(JSON.parse(text.slice(4, arrayEnd + 1))).toEqual([
      { a: 'say "hi" ] here' },
    ])
  })

  it('answers -1 when the array never closes', () => {
    expect(findBalancedArrayEnd('x = [1, 2', 4)).toBe(-1)
  })
})
