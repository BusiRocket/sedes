import { describe, expect, it } from 'vitest'

import { readDatoValues } from './readDatoValues'

describe('readDatoValues', () => {
  it('returns every value of the named Dato, unescaped and trimmed', () => {
    const xml =
      '<Dato Nombre="Periodo"> 2026-08 </Dato><Dato Nombre="Otro">x</Dato><Dato Nombre="Periodo">A &amp; B</Dato>'

    expect(readDatoValues(xml, 'Periodo')).toEqual(['2026-08', 'A & B'])
    expect(readDatoValues(xml, 'Falta')).toEqual([])
  })
})
