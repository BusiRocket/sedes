import { describe, expect, it } from 'vitest'

import { notificationSourceFromIssuer } from './notificationSourceFromIssuer'

describe('notificationSourceFromIssuer', () => {
  it('recognizes the TGSS', () => {
    expect(
      notificationSourceFromIssuer('Tesoreria General de la Seguridad Social'),
    ).toBe('tgss')
  })

  it('recognizes the AEAT', () => {
    expect(
      notificationSourceFromIssuer(
        'Agencia Estatal de Administracion Tributaria',
      ),
    ).toBe('aeat')
  })

  it('recognizes OARGT before the generic Tributaria pattern matches AEAT', () => {
    expect(
      notificationSourceFromIssuer(
        'Organismo Autonomo de Recaudacion y Gestion Tributaria',
      ),
    ).toBe('oargt')
  })

  it('recognizes a town hall', () => {
    expect(notificationSourceFromIssuer('Ayuntamiento de Ejemplo')).toBe('ayto')
  })

  it('falls back to other for anything unrecognized', () => {
    expect(notificationSourceFromIssuer('Ministerio de Justicia')).toBe('other')
  })
})
