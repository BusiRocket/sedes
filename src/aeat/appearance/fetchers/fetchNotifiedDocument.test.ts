import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import { fetchNotifiedDocument } from './fetchNotifiedDocument'

const answer = (body: Buffer): Awaited<ReturnType<HttpClient['request']>> => ({
  status: 200,
  url: '',
  headers: {},
  body,
  text: '',
})

describe('fetchNotifiedDocument', () => {
  it('POSTs vernotif and returns the PDF', async () => {
    const pdf = Buffer.from('%PDF-1.4 x')
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(pdf))
    expect(
      await fetchNotifiedDocument({ request, cookie: () => undefined }, '123'),
    ).toBe(pdf)
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      method: 'POST',
      form: { accion: 'vernotif', ncc: '123' },
    })
  })

  it('refuses anything but a PDF', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(answer(Buffer.from('<html>')))
    await expect(
      fetchNotifiedDocument({ request, cookie: () => undefined }, '123'),
    ).rejects.toThrow('did not answer a PDF')
  })
})
