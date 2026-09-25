import { describe, expect, it } from 'vitest'

import { readComment } from './readComment'

describe('readComment', () => {
  it('reads a comment', () => {
    expect(readComment({ text: '<!-- hi -->', position: 0 })).toEqual({
      kind: 'comment',
      value: ' hi ',
    })
  })
  it('refuses "--" inside and a trailing "-"', () => {
    expect(() => readComment({ text: '<!-- a -- b -->', position: 0 })).toThrow(
      '"--" inside a comment',
    )
    expect(() => readComment({ text: '<!-- a --->', position: 0 })).toThrow(
      '"--" inside a comment',
    )
  })
})
