import { describe, expect, it } from 'vitest'

import { apiHeaders } from './apiHeaders'

describe('apiHeaders', () => {
  it('carries the bearer token and asks for JSON', () => {
    expect(apiHeaders('token123')).toEqual({
      Authorization: 'Bearer token123',
      Accept: 'application/json',
    })
  })
})
