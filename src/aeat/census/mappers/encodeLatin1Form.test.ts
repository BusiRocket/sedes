import { describe, expect, it } from 'vitest'

import { encodeLatin1Form } from './encodeLatin1Form'

describe('encodeLatin1Form', () => {
  it('joins pairs with & and keeps their order', () => {
    expect(
      encodeLatin1Form([
        ['fAccion', '2'],
        ['fNombre', 'Ñ S.L.'],
      ]),
    ).toBe('fAccion=2&fNombre=%D1%20S.L.')
  })

  it('is empty for no pairs', () => {
    expect(encodeLatin1Form([])).toBe('')
  })
})
