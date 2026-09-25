import { describe, expect, it } from 'vitest'

import { parseLetterDocumentNcc } from './parseLetterDocumentNcc'
import { parseLetterJustificante } from './parseLetterJustificante'
import { parsePuvToken } from './parsePuvToken'
import { readStepInput } from './readStepInput'

describe('payment-letter parsers', () => {
  it('reads the pUV token', () => {
    expect(parsePuvToken("jQuery('#pUV').val('68747470');")).toBe('68747470')
    expect(parsePuvToken('<p/>')).toBeUndefined()
  })

  it('reads the justificante under Documento de ingreso', () => {
    expect(
      parseLetterJustificante(
        '<p>Ref 999999999999Z</p><h3>Documento de ingreso</h3><td>010</td><td>100000000000A</td>',
      ),
    ).toBe('100000000000A')
    expect(parseLetterJustificante('<p>100000000000A</p>')).toBeUndefined()
  })

  it('reads the PDF ncc from a link or from OBTENERDOC', () => {
    expect(
      parseLetterDocumentNcc("<a href='/VerPdfWlpl?ncc=ABC123456&x'>"),
    ).toBe('ABC123456')
    expect(
      parseLetterDocumentNcc(
        "function f(){ jQuery('#faccion').val('OBTENERDOC'); jQuery('#ncc').val('XYZ987654'); }",
      ),
    ).toBe('XYZ987654')
    expect(parseLetterDocumentNcc('<p/>')).toBeUndefined()
  })

  it('builds the next step input or stops', () => {
    expect(
      readStepInput("jQuery('#pUV').val('AB');", '00000000T', 'A1'),
    ).toEqual({ nif: '00000000T', clave: 'A1', puv: 'AB' })
    expect(() => readStepInput('<p/>', '00000000T', 'A1')).toThrow(
      'without a pUV token',
    )
  })
})
