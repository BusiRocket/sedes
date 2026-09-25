import { describe, expect, it } from 'vitest'

import type { HttpResponse } from '../../http/types/HttpResponse'
import { parseJsonResponse } from './parseJsonResponse'

const response = (status: number, text: string): HttpResponse => ({
  status,
  url: 'https://dehu.redsara.es/api/v1/notifications',
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('parseJsonResponse', () => {
  it('parses a JSON body', () => {
    expect(parseJsonResponse(response(200, '{"items":[]}'), 'x')).toEqual({
      items: [],
    })
  })

  it('fails with the status and the context label on invalid JSON', () => {
    expect(() =>
      parseJsonResponse(
        response(401, '<html>not json</html>'),
        'pending notifications',
      ),
    ).toThrow(/pending notifications did not return JSON \(status 401\)/)
  })
})
