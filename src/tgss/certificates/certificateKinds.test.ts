import { describe, expect, it } from 'vitest'

import { certificateKinds } from './certificateKinds'

describe('certificateKinds', () => {
  it('maps every kind to a distinct portal option that is not a debt report', () => {
    const values = Object.values(certificateKinds).map((info) => info.value)
    expect(new Set(values).size).toBe(values.length)
    expect(values).not.toContain('6')
    expect(values).not.toContain('7')
  })

  it('flags only the dated kinds as needing a date', () => {
    const dated = Object.entries(certificateKinds)
      .filter(([, info]) => info.needsDate)
      .map(([kind]) => kind)
    expect(dated).toEqual([
      'sin-deuda-fecha',
      'licitacion-fecha',
      'subvenciones-fecha',
    ])
  })
})
