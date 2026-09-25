import { describe, expect, it } from 'vitest'

import { readErrorFlags } from './readErrorFlags'

describe('readErrorFlags', () => {
  it('names only the raised error flags', () => {
    const xml =
      '<Dato Nombre="mostrarErrorFecha">true</Dato><Dato Nombre="mostrarErrorCorreo">false</Dato>'

    expect(readErrorFlags(xml)).toEqual(['mostrarErrorFecha'])
  })
})
