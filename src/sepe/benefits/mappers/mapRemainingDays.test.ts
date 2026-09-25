import { describe, expect, it } from 'vitest'

import { mapRemainingDays } from './mapRemainingDays'

describe('mapRemainingDays', () => {
  it('subtracts consumed from granted days', () => {
    expect(
      mapRemainingDays({ diasDerecho: '720', diasConsumidos: '300' }),
    ).toBe(420)
  })

  it('is undefined when a count is missing or not a whole number', () => {
    expect(mapRemainingDays({ diasDerecho: '720' })).toBeUndefined()
    expect(
      mapRemainingDays({ diasDerecho: '720', diasConsumidos: '' }),
    ).toBeUndefined()
    expect(
      mapRemainingDays({ diasDerecho: '7,5', diasConsumidos: '1' }),
    ).toBeUndefined()
  })
})
