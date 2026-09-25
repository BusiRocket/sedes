import { describe, expect, it } from 'vitest'

import { readDatoRecords } from './readDatoRecords'

describe('readDatoRecords', () => {
  it('maps each named row to its fields and skips other rows', () => {
    const xml = [
      '<DatoRegistro Nombre="Filas"><Dato Nombre="A">1</Dato><Dato Nombre="B">x &amp; y</Dato></DatoRegistro>',
      '<DatoRegistro Nombre="Otras"><Dato Nombre="A">9</Dato></DatoRegistro>',
      '<DatoRegistro Nombre="Filas"><Dato Nombre="A">2</Dato></DatoRegistro>',
    ].join('\n')

    expect(readDatoRecords(xml, 'Filas')).toEqual([
      { A: '1', B: 'x & y' },
      { A: '2' },
    ])
  })
})
