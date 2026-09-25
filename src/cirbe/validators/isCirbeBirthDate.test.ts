import { describe, expect, it } from 'vitest'

import { isCirbeBirthDate } from './isCirbeBirthDate'

describe('isCirbeBirthDate', () => {
  it('accepts dd-mm-aaaa only', () => {
    expect(isCirbeBirthDate('07-03-1985')).toBe(true)
    expect(isCirbeBirthDate('1985-03-07')).toBe(false)
    expect(isCirbeBirthDate('7-3-1985')).toBe(false)
    expect(isCirbeBirthDate('32-01-1985')).toBe(false)
    expect(isCirbeBirthDate('07/03/1985')).toBe(false)
  })
})
