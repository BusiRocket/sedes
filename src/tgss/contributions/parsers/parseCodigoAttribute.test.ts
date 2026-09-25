import { describe, expect, it } from 'vitest'

import { parseCodigoAttribute } from './parseCodigoAttribute'

describe('parseCodigoAttribute', () => {
  it('reads the CODIGO attribute of the named element', () => {
    const xml =
      '<PersonaFisica><NAF CODIGO="100000000001"></NAF><NIF CODIGO="000000000T"></NIF></PersonaFisica>'

    expect(parseCodigoAttribute(xml, 'NAF')).toBe('100000000001')
    expect(parseCodigoAttribute(xml, 'NIF')).toBe('000000000T')
  })

  it('is undefined when the element is missing or empty', () => {
    expect(parseCodigoAttribute('<NAF CODIGO=""></NAF>', 'NAF')).toBeUndefined()
    expect(parseCodigoAttribute('<x/>', 'NAF')).toBeUndefined()
  })
})
