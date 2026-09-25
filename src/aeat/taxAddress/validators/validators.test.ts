import { describe, expect, it } from 'vitest'

import { taxAddressRequest } from '../fixtures/taxAddressRequest'
import { blockingM036Errors } from './blockingM036Errors'
import { isLegalEntityNif } from './isLegalEntityNif'
import { taxAddressProblems } from './taxAddressProblems'

describe('036 validators', () => {
  it('recognises legal-entity NIFs', () => {
    expect(isLegalEntityNif('b00000000')).toBe(true)
    expect(isLegalEntityNif('00000000T')).toBe(false)
  })

  it('accepts a complete request', () => {
    expect(taxAddressProblems(taxAddressRequest)).toEqual([])
  })

  it('lists every problem', () => {
    const problems = taxAddressProblems({
      ...taxAddressRequest,
      nif: '00000000T',
      codigoPostal: '1000',
      via: ' ',
      tipoNumero: '',
      numero: '',
      referenciaCatastral: 'short',
      lugar: '',
      firmado: '',
      calidad: '',
    })
    expect(problems).toHaveLength(9)
    expect(problems[0]).toMatch(/not a legal entity/)
  })

  it('joins every error code but 00000', () => {
    expect(blockingM036Errors("value:'00000',value:'ok'")).toBeUndefined()
    expect(
      blockingM036Errors(
        "value:'00000',value:'ok' value:'12345',value:'Falta el c\\xf3digo'",
      ),
    ).toBe('12345 Falta el código')
  })
})
