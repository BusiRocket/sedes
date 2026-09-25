import { describe, expect, it } from 'vitest'

import { parseHolderName } from './parseHolderName'

describe('parseHolderName', () => {
  it('reads the name from the personal-area header span', () => {
    expect(
      parseHolderName(
        '<span id="user-name"\n class="aeat--username">DOE PEREZ JANE</span>',
      ),
    ).toBe('DOE PEREZ JANE')
  })

  it('answers undefined without the span', () => {
    expect(parseHolderName('<html></html>')).toBeUndefined()
  })
})
