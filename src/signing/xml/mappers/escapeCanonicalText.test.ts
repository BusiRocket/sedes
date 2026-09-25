import { describe, expect, it } from 'vitest'

import { escapeCanonicalText } from './escapeCanonicalText'

describe('escapeCanonicalText', () => {
  it('escapes &, <, > and carriage return only', () => {
    expect(escapeCanonicalText('a&b<c>d\re"f\'\t')).toBe(
      'a&amp;b&lt;c&gt;d&#xD;e"f\'\t',
    )
  })
})
