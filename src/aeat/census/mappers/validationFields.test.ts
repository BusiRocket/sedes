import { describe, expect, it } from 'vitest'

import { validationFields } from './validationFields'

describe('validationFields', () => {
  it('builds the fAccion=2 body around the token', () => {
    const pairs = validationFields('tok==')
    expect(pairs).toContainEqual(['fIslw', 'tok=='])
    expect(pairs).toContainEqual(['fAccion', '2'])
    expect(pairs.at(-1)).toEqual(['validarSolicitud', 'Validar solicitud'])
  })
})
