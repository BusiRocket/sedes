import { describe, expect, it } from 'vitest'

import { parsePdfDict } from './parsePdfDict'
import { parsePdfValue } from './parsePdfValue'

describe('parsePdfDict', () => {
  it('reads entries up to >>', () => {
    expect(
      parsePdfDict({ text: '/A 1 >>', pos: 0 }, parsePdfValue).entries,
    ).toEqual([['A', { kind: 'raw', text: '1' }]])
  })

  it('refuses a key that is not a name', () => {
    expect(() =>
      parsePdfDict({ text: '1 2 >>', pos: 0 }, parsePdfValue),
    ).toThrow(/key expected/)
  })
})
