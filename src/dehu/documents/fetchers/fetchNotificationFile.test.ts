import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchNotificationFile } from './fetchNotificationFile'

const answer = (status: number, text: string): HttpResponse => ({
  status,
  url: 'https://dehu.redsara.es/api/v1/realized_notifications/REF/document',
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('fetchNotificationFile', () => {
  it('reads the base64 content and name of a 200 answer with the bearer token', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(
        answer(200, JSON.stringify({ content: 'JVBERi0=', name: 'acto.pdf' })),
      )
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await fetchNotificationFile({
      client,
      authData: 'TOKEN',
      reference: 'REF/1',
      kind: 'document',
    })

    expect(result).toEqual({
      status: 200,
      content: 'JVBERi0=',
      name: 'acto.pdf',
    })
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://dehu.redsara.es/api/v1/realized_notifications/REF%2F1/document',
    )
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      headers: { Authorization: 'Bearer TOKEN' },
    })
  })

  it('returns only the status when the portal does not answer 200', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(503, '<html>busy</html>'))
    const client: HttpClient = { request, cookie: () => undefined }

    expect(
      await fetchNotificationFile({
        client,
        authData: 'T',
        reference: 'REF',
        kind: 'voucher',
      }),
    ).toEqual({ status: 503 })
  })

  it('leaves content undefined when a 200 body lacks it', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200, JSON.stringify({ name: 3 })))
    const client: HttpClient = { request, cookie: () => undefined }

    expect(
      await fetchNotificationFile({
        client,
        authData: 'T',
        reference: 'REF',
        kind: 'voucher',
      }),
    ).toEqual({ status: 200, content: undefined, name: undefined })
  })
})
