import { describe, expect, it } from 'vitest'

import { validateNif } from './validateNif'

// Every value below is synthetic, built from the published algorithms; none
// identifies a real person or entity.
const entity = 'persona-juridica'

describe('validateNif', () => {
  it.each([
    ['00000001R', 'dni'],
    ['X0000001R', 'nie'],
    ['Y1234567X', 'nie'],
    ['Z0000002F', 'nie'],
    ['K0000003A', 'nif-especial'],
    ['B12345674', entity],
    ['Q1234567D', entity],
    ['G1234567D', entity],
    ['G12345674', entity],
  ])('accepts %s as %s', (value, tipo) => {
    expect(validateNif(value)).toEqual({
      valor: value,
      normalizado: value,
      tipo,
      valido: true,
    })
  })

  it('normalizes case, separators, the ES prefix and a short DNI number', () => {
    expect(validateNif('es b-1234567.4').normalizado).toBe('B12345674')
    expect(validateNif(' 1r ')).toMatchObject({
      normalizado: '00000001R',
      valido: true,
    })
  })

  it('names the expected letter of a person NIF', () => {
    expect(validateNif('00000001T')).toEqual({
      valor: '00000001T',
      normalizado: '00000001T',
      tipo: 'dni',
      valido: false,
      motivo: 'control letter T does not match the expected R',
    })
    expect(validateNif('X0000001T').valido).toBe(false)
    expect(validateNif('M0000003B').valido).toBe(false)
  })

  it('requires a digit or a letter by the entity type letter', () => {
    expect(validateNif('B1234567D').motivo).toBe(
      'control character D does not match the expected 4',
    )
    expect(validateNif('Q12345674').motivo).toBe(
      'control character 4 does not match the expected D',
    )
    expect(validateNif('G12345675').motivo).toBe(
      'control character 5 does not match the expected 4 or D',
    )
  })

  it('reports a value of no known shape', () => {
    expect(validateNif('hello')).toEqual({
      valor: 'hello',
      normalizado: 'HELLO',
      tipo: 'desconocido',
      valido: false,
      motivo: 'the value has the shape of no Spanish tax identifier',
    })
  })
})
