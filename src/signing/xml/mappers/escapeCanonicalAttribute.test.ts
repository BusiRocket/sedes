import { describe, expect, it } from 'vitest'

import { escapeCanonicalAttribute } from './escapeCanonicalAttribute'

describe('escapeCanonicalAttribute', () => {
  it('escapes &, <, ", tab, line feed and carriage return', () => {
    expect(escapeCanonicalAttribute('&<>"\'\t\n\r')).toBe(
      "&amp;&lt;>&quot;'&#x9;&#xA;&#xD;",
    )
  })
})
