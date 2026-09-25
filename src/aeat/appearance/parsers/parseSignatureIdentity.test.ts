import { describe, expect, it } from 'vitest'

import { parseSignatureIdentity } from './parseSignatureIdentity'

describe('parseSignatureIdentity', () => {
  it('reads both script values', () => {
    expect(
      parseSignatureIdentity(
        '<script>var _fbNif = \'00000000T\'; var _fbNombre="GARCIA LOPEZ ANA";</script>',
      ),
    ).toEqual({ nif: '00000000T', nombre: 'GARCIA LOPEZ ANA' })
  })

  it('refuses a page without them', () => {
    expect(() => parseSignatureIdentity('<p>error</p>')).toThrow(
      'not a signature screen',
    )
  })
})
