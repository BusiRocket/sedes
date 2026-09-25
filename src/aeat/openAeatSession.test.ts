import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import { openAeatSession } from './openAeatSession'

describe('openAeatSession', () => {
  it('GETs MdcAcceso to set the session cookies', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 200,
      url: 'https://www1.agenciatributaria.gob.es/wlpl/BUGC-JDIT/MdcAcceso',
      headers: {},
      body: Buffer.alloc(0),
      text: '',
    })
    const client: HttpClient = { request, cookie: () => undefined }
    await openAeatSession(client)
    expect(request).toHaveBeenCalledWith(
      'https://www1.agenciatributaria.gob.es/wlpl/BUGC-JDIT/MdcAcceso',
    )
  })

  it('refuses a session the portal answers with anything but 200', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue({
      status: 403,
      url: 'https://www1.agenciatributaria.gob.es/wlpl/BUGC-JDIT/MdcAcceso',
      headers: {},
      body: Buffer.alloc(0),
      text: '',
    })
    const client: HttpClient = { request, cookie: () => undefined }
    await expect(openAeatSession(client)).rejects.toThrow(
      'session refused (HTTP 403)',
    )
  })
})
