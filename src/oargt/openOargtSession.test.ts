import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { openOargtSession } from './openOargtSession'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('openOargtSession', () => {
  it('visits the public page then the private RECIBOS page', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page('https://sede.oargt.es/sta/CarpetaPublic/public', '<p>ok</p>'),
      )
      .mockResolvedValueOnce(
        page(
          'https://sede.oargt.es/sta/CarpetaPrivate/doEvent?PAGE_CODE=RECIBOS',
          '<p>recibos</p>',
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const result = await openOargtSession(client)
    expect(request).toHaveBeenNthCalledWith(
      1,
      'https://sede.oargt.es/sta/CarpetaPublic/public?APP_CODE=STA&PAGE_CODE=OARGT_OVC',
    )
    expect(request).toHaveBeenNthCalledWith(
      2,
      'https://sede.oargt.es/sta/CarpetaPrivate/Certificate?APP_CODE=STA&PAGE_CODE=RECIBOS',
    )
    expect(result.url).toBe(
      'https://sede.oargt.es/sta/CarpetaPrivate/doEvent?PAGE_CODE=RECIBOS',
    )
  })
})
