import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import type { Sleep } from '../types/Sleep'
import { fetchNotificationFileWithRetry } from './fetchNotificationFileWithRetry'

const answer = (status: number, body?: unknown): HttpResponse => {
  const text = body === undefined ? '' : JSON.stringify(body)
  return {
    status,
    url: 'https://dehu.redsara.es/api/v1/realized_notifications/REF/document',
    headers: {},
    body: Buffer.from(text),
    text,
  }
}

describe('fetchNotificationFileWithRetry', () => {
  it('returns the first 200 without sleeping', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200, { content: 'AA==', name: 'a.pdf' }))
    const client: HttpClient = { request, cookie: () => undefined }
    const sleep = vi.fn<Sleep>().mockResolvedValue(undefined)

    const result = await fetchNotificationFileWithRetry(
      { client, authData: 'T', reference: 'REF', kind: 'document' },
      sleep,
    )

    expect(result.content).toBe('AA==')
    expect(request).toHaveBeenCalledTimes(1)
    expect(sleep).not.toHaveBeenCalled()
  })

  it('retries a 503 after the first wait and returns the 200 that follows', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(answer(503))
      .mockResolvedValueOnce(answer(409))
      .mockResolvedValueOnce(answer(200, { content: 'AA==', name: 'a.pdf' }))
    const client: HttpClient = { request, cookie: () => undefined }
    const sleep = vi.fn<Sleep>().mockResolvedValue(undefined)

    const result = await fetchNotificationFileWithRetry(
      { client, authData: 'T', reference: 'REF', kind: 'document' },
      sleep,
    )

    expect(result.status).toBe(200)
    expect(request).toHaveBeenCalledTimes(3)
    expect(sleep.mock.calls.map(([ms]) => ms)).toEqual([3_000, 8_000])
  })

  it('never retries a 404', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(404))
    const client: HttpClient = { request, cookie: () => undefined }
    const sleep = vi.fn<Sleep>().mockResolvedValue(undefined)

    const result = await fetchNotificationFileWithRetry(
      { client, authData: 'T', reference: 'REF', kind: 'voucher' },
      sleep,
    )

    expect(result).toEqual({ status: 404 })
    expect(request).toHaveBeenCalledTimes(1)
    expect(sleep).not.toHaveBeenCalled()
  })

  it('gives up after the ladder and hands back the last answer', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(503))
    const client: HttpClient = { request, cookie: () => undefined }
    const sleep = vi.fn<Sleep>().mockResolvedValue(undefined)

    const result = await fetchNotificationFileWithRetry(
      { client, authData: 'T', reference: 'REF', kind: 'document' },
      sleep,
    )

    expect(result).toEqual({ status: 503 })
    expect(request).toHaveBeenCalledTimes(5)
    expect(sleep.mock.calls.map(([ms]) => ms)).toEqual([
      3_000, 8_000, 20_000, 45_000,
    ])
  })
})
