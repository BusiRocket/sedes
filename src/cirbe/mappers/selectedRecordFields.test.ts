import { describe, expect, it } from 'vitest'

import { selectedRecordFields } from './selectedRecordFields'

describe('selectedRecordFields', () => {
  it('prefixes each key and fills the missing ones with empty strings', () => {
    expect(selectedRecordFields('Sel', { A: '1' }, ['A', 'B'])).toEqual({
      'Sel.A': '1',
      'Sel.B': '',
    })
  })
})
