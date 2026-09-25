import { describe, expect, it } from 'vitest'

import { notificationApiItems } from './notificationApiItems'

const validItem = {
  identifier: 'X1',
  concept: 'C1',
  emitterEntity: 'E1',
  availabilityDate: '2026-01-01T00:00:00+01:00',
}

describe('notificationApiItems', () => {
  it('reads every valid item and drops malformed ones', () => {
    const result = notificationApiItems({
      items: [validItem, { identifier: 'incomplete' }, validItem],
    })
    expect(result).toHaveLength(2)
    expect(result[0]).toMatchObject({ identifier: 'X1' })
  })

  it('returns an empty list when items is missing or not an array', () => {
    expect(notificationApiItems({})).toEqual([])
    expect(notificationApiItems({ items: 'nope' })).toEqual([])
    expect(notificationApiItems('nope')).toEqual([])
  })
})
