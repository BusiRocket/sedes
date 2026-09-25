import { describe, expect, it } from 'vitest'

import { readStartTag } from './readStartTag'

describe('readStartTag', () => {
  it('reads the element and whether it closes itself', () => {
    expect(readStartTag({ text: '<a b="1"/>', position: 0 })).toEqual({
      type: 'start',
      element: {
        kind: 'element',
        name: 'a',
        attributes: [{ name: 'b', value: '1' }],
        children: [],
      },
      selfClosing: true,
    })
  })
})
