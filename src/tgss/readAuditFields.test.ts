import { describe, expect, it } from 'vitest'

import { readAuditFields } from './readAuditFields'

describe('readAuditFields', () => {
  it('reads all four DatosAuditoria fields', () => {
    const xml =
      '<NIFInteresado>12345678Z</NIFInteresado>' +
      '<TIPOpcionSeleccionada>7</TIPOpcionSeleccionada>' +
      '<DETModoEjecucion>O</DETModoEjecucion>' +
      '<DOCDocumento>20260032162911</DOCDocumento>'
    expect(readAuditFields(xml)).toEqual({
      NIFInteresado: '12345678Z',
      TIPOpcionSeleccionada: '7',
      DETModoEjecucion: 'O',
      DOCDocumento: '20260032162911',
    })
  })

  it('falls back to an empty string for a missing field', () => {
    const xml = '<NIFInteresado>12345678Z</NIFInteresado>'
    expect(readAuditFields(xml)).toEqual({
      NIFInteresado: '12345678Z',
      TIPOpcionSeleccionada: '',
      DETModoEjecucion: '',
      DOCDocumento: '',
    })
  })
})
