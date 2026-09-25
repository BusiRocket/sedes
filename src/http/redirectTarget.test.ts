import { describe, expect, it } from 'vitest'

import type { HttpResponse } from './HttpResponse'
import { redirectTarget } from './redirectTarget'

const requestUrl = 'https://a.example/x'

const response = (
  status: number,
  location?: string | string[],
): HttpResponse => ({
  status,
  url: requestUrl,
  headers: location === undefined ? {} : { location },
  body: Buffer.alloc(0),
  text: '',
})

describe('redirectTarget', () => {
  it('resolves a relative location against the request URL', () => {
    expect(redirectTarget(response(302, '/y?z=1'), requestUrl)).toBe(
      'https://a.example/y?z=1',
    )
  })

  it('answers undefined for a non-redirect or a missing location', () => {
    expect(redirectTarget(response(200, '/y'), requestUrl)).toBeUndefined()
    expect(redirectTarget(response(302), requestUrl)).toBeUndefined()
    expect(
      redirectTarget(response(302, ['a', 'b']), requestUrl),
    ).toBeUndefined()
  })
})
