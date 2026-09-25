import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchNotificationList } from './fetchNotificationList'

const answer = (
  status: number,
): Awaited<ReturnType<HttpClient['request']>> => ({
  status,
  url: '',
  headers: {},
  body: Buffer.from('<html/>'),
  text: '<html/>',
})

describe('fetchNotificationList', () => {
  it('POSTs the unread query with dd-mm-aaaa dates', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200))
    const html = await fetchNotificationList(
      { request, cookie: () => undefined },
      {
        read: 'unread',
        from: new Date(2025, 8, 26),
        to: new Date(2026, 8, 26),
      },
    )
    expect(html).toBe('<html/>')
    const [url, options] = request.mock.calls[0] ?? []
    expect(url).toBe(
      'https://www1.agenciatributaria.gob.es/wlpl/GNNO-JDIT/SvInteresadosQuery',
    )
    expect(options?.form).toMatchObject({
      F_FECHA_DESDE: '26-09-2025',
      F_FECHA_HASTA: '26-09-2026',
      F_LEIDA: '0',
      VEZ: 'BUSCAR1',
      CLASGTE: '20/0/',
    })
  })

  it('maps read and all to their flags', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(200))
    const client: HttpClient = { request, cookie: () => undefined }
    const dates = { from: new Date(2026, 0, 1), to: new Date(2026, 0, 2) }
    await fetchNotificationList(client, { read: 'read', ...dates })
    await fetchNotificationList(client, { read: 'all', ...dates })
    expect(request.mock.calls[0]?.[1]?.form?.['F_LEIDA']).toBe('1')
    expect(request.mock.calls[1]?.[1]?.form?.['F_LEIDA']).toBe('')
  })

  it('throws on anything but 200', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(500))
    await expect(
      fetchNotificationList(
        { request, cookie: () => undefined },
        { read: 'all', from: new Date(), to: new Date() },
      ),
    ).rejects.toThrow('HTTP 500')
  })
})
