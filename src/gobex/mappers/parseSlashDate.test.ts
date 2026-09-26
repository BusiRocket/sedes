import { describe, expect, it } from 'vitest'

import { parseSlashDate } from './parseSlashDate'

describe('parseSlashDate', () => {
  it('reads dd/mm/aaaa as a local date', () => {
    expect(parseSlashDate('29/02/2024')).toEqual(new Date(2024, 1, 29))
  })

  it('refuses other shapes and impossible days', () => {
    expect(() => parseSlashDate('2024-02-29')).toThrow('not a dd/mm/aaaa date')
    expect(() => parseSlashDate('31/02/2026')).toThrow('not a dd/mm/aaaa date')
  })
})
