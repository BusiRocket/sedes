import { describe, expect, it } from 'vitest'

import { classifyDebtState } from './classifyDebtState'

describe('classifyDebtState', () => {
  it('classifies a deferred or fractioned situacion as aplazada, even in ejecutiva', () => {
    expect(
      classifyDebtState('Ejecutivo', 'Aplazada / Fraccionada (ART.65 LGT)'),
    ).toBe('aplazada')
    expect(classifyDebtState('Voluntario', 'Fraccionado')).toBe('aplazada')
  })

  it('classifies an embargo situacion as embargo, beating a plain ejecutiva periodo', () => {
    expect(
      classifyDebtState('Ejecutivo', 'Pendiente de pago en fase de embargo'),
    ).toBe('embargo')
  })

  it('falls back to the raw periodo when situacion carries no special marker', () => {
    expect(classifyDebtState('Ejecutivo', 'Pendiente de pago')).toBe(
      'ejecutiva',
    )
    expect(
      classifyDebtState(
        'Voluntario',
        'Pendiente de pago en plazo de pago voluntario',
      ),
    ).toBe('voluntaria')
  })

  it('defaults to voluntaria when both fields are missing', () => {
    expect(classifyDebtState(undefined, undefined)).toBe('voluntaria')
  })
})
