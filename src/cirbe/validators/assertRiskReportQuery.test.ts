import { describe, expect, it } from 'vitest'

import { assertRiskReportQuery } from './assertRiskReportQuery'

describe('assertRiskReportQuery', () => {
  it('accepts a valid query', () => {
    expect(() => {
      assertRiskReportQuery({ birthDate: '07-03-1985', email: 'a@b.es' })
    }).not.toThrow()
  })

  it('rejects a birth date in another format', () => {
    expect(() => {
      assertRiskReportQuery({ birthDate: '1985-03-07', email: 'a@b.es' })
    }).toThrow(/--nacimiento/)
  })

  it.each(['ab.es', '@b.es', 'a@b', 'a@@b.es', 'a b@c.es'])(
    'rejects the e-mail %s',
    (email) => {
      expect(() => {
        assertRiskReportQuery({ birthDate: '07-03-1985', email })
      }).toThrow(/--email/)
    },
  )
})
