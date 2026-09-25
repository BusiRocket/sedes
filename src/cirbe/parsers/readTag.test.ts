import { describe, expect, it } from 'vitest'

import { readTag } from './readTag'

describe('readTag', () => {
  it('reads the first element with that tag', () => {
    const xml =
      '<RespuestaIAS><IdUnico> 42 </IdUnico><EstadoPresentacion>P#Informacion</EstadoPresentacion></RespuestaIAS>'

    expect(readTag(xml, 'IdUnico')).toBe('42')
    expect(readTag(xml, 'EstadoPresentacion')).toBe('P#Informacion')
    expect(readTag(xml, 'Falta')).toBeUndefined()
  })
})
