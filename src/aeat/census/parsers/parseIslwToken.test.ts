import { describe, expect, it } from 'vitest'

import { parseIslwToken } from './parseIslwToken'

describe('parseIslwToken', () => {
  it('reads the single-quoted hidden token', () => {
    expect(
      parseIslwToken("<input type='hidden' name='fIslw' value='AbC123=='>"),
    ).toBe('AbC123==')
  })

  it('reads the double-quoted variant', () => {
    expect(
      parseIslwToken('<input type="hidden" name="fIslw" value="tok">'),
    ).toBe('tok')
  })

  it('is undefined when the certificate did not authenticate', () => {
    expect(parseIslwToken('<html>acceso denegado</html>')).toBeUndefined()
  })
})
