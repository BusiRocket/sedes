import { describe, expect, it } from 'vitest'

import { isNotificationId } from './isNotificationId'

describe('isNotificationId', () => {
  it('accepts digits only', () => {
    expect(isNotificationId('1234567890123')).toBe(true)
    expect(isNotificationId('12AB')).toBe(false)
    expect(isNotificationId('')).toBe(false)
  })
})
