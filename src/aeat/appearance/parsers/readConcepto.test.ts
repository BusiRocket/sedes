import { describe, expect, it } from 'vitest'

import { readConcepto } from './readConcepto'

describe('readConcepto', () => {
  it('stops at the next label', () => {
    expect(readConcepto('Concepto: LIQ A01 Fecha notificación: 1')).toBe(
      'LIQ A01',
    )
  })

  it('reads to the end without a next label', () => {
    expect(readConcepto('Concepto LIQ A01')).toBe('LIQ A01')
  })

  it('answers undefined without the label or with an empty value', () => {
    expect(readConcepto('nada')).toBeUndefined()
    expect(readConcepto('Concepto: Fecha x')).toBeUndefined()
  })
})
