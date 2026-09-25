import { describe, expect, it } from 'vitest'

import { selectResolvedRecord } from './selectResolvedRecord'

describe('selectResolvedRecord', () => {
  it('picks the first downloadable request', () => {
    const rows = [
      { ESTADO: 'Registrada', REFERENCIA: 'R3' },
      { ESTADO: 'Descargada', REFERENCIA: 'R2' },
      { ESTADO: 'Resuelta', REFERENCIA: 'R1' },
    ]

    expect(selectResolvedRecord(rows)?.['REFERENCIA']).toBe('R2')
  })

  it('answers undefined when nothing is resolved', () => {
    expect(selectResolvedRecord([{ ESTADO: 'Registrada' }, {}])).toBe(undefined)
  })
})
