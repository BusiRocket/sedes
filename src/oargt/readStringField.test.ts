import { describe, expect, it } from 'vitest'

import { readStringField } from './readStringField'

describe('readStringField', () => {
  it('returns the field when it is a string', () => {
    expect(readStringField({ referen: '117' }, 'referen')).toBe('117')
  })

  it('returns an empty string for a missing, non-string or null field', () => {
    expect(readStringField({}, 'referen')).toBe('')
    expect(readStringField({ referen: 42 }, 'referen')).toBe('')
    expect(readStringField({ referen: null }, 'referen')).toBe('')
  })
})
