import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { fetchRealizedNotifications } from './fetchRealizedNotifications'

const jsonPage = (body: unknown): HttpResponse => {
  const text = JSON.stringify(body)
  return {
    status: 200,
    url: 'https://dehu.redsara.es/api/v1/realized_notifications',
    headers: {},
    body: Buffer.from(text),
    text,
  }
}

const item = {
  identifier: 'N1',
  concept: 'Concept',
  emitterEntity: 'Agencia Estatal de Administracion Tributaria',
  availabilityDate: '2026-02-01T00:00:00+01:00',
  state: 'ACEPTADA',
}

describe('fetchRealizedNotifications', () => {
  it('sweeps all twelve months of the year, one page each when short', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(jsonPage({ items: [] }))
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await fetchRealizedNotifications(client, 'TOKEN', 2026)

    expect(request).toHaveBeenCalledTimes(12)
    expect(result.pages).toBe(12)
    expect(result.notifications).toHaveLength(0)
    const [url] = request.mock.calls[0] ?? []
    expect(url).toContain('finalDate%5Bleft_date%5D=01%2F01%2F2026')
    expect(url).toContain('finalDate%5Bright_date%5D=31%2F01%2F2026')
  })

  it('collects items found in any month and pages within a month', async () => {
    const fullPage = Array.from({ length: 100 }, (_unused, index) => ({
      ...item,
      identifier: `N${String(index)}`,
    }))
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(jsonPage({ items: fullPage }))
      .mockResolvedValueOnce(jsonPage({ items: [item] }))
      .mockResolvedValue(jsonPage({ items: [] }))
    const client: HttpClient = { request, cookie: () => undefined }

    const result = await fetchRealizedNotifications(client, 'TOKEN', 2026)

    expect(result.notifications).toHaveLength(101)
    expect(result.pages).toBe(13)
  })
})
