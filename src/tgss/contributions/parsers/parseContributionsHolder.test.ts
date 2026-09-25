import { describe, expect, it } from 'vitest'

import { parseContributionsHolder } from './parseContributionsHolder'

describe('parseContributionsHolder', () => {
  it('reads PersonaFisica and unpads the NIF', () => {
    const xml =
      '<PersonaFisica><nombre>NOMBRE APELLIDO</nombre><NAF CODIGO="100000000001"></NAF><NIF CODIGO="000000000T"></NIF></PersonaFisica>'

    expect(parseContributionsHolder(xml)).toEqual({
      holder: 'NOMBRE APELLIDO',
      nif: '00000000T',
      naf: '100000000001',
    })
  })

  it('leaves every field undefined on an empty screen', () => {
    expect(parseContributionsHolder('<x/>')).toEqual({
      holder: undefined,
      nif: undefined,
      naf: undefined,
    })
  })
})
