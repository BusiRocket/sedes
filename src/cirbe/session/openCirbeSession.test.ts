import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { openCirbeSession } from './openCirbeSession'

vi.mock('./loginWithCertificate', () => ({
  loginWithCertificate: vi.fn().mockResolvedValue(undefined),
}))

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('openCirbeSession', () => {
  it('accepts an IAS home', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/h', '<RespuestaIAS/>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(openCirbeSession(client)).resolves.toBeUndefined()
    expect(request.mock.calls[0]?.[0]).toBe(
      'https://aps.bde.es/cir_www/InicioXml',
    )
  })

  it('refuses anything else', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://aps.bde.es/h', '<html>no</html>'))
    const client: HttpClient = { request, cookie: () => undefined }

    await expect(openCirbeSession(client)).rejects.toThrow(
      /CIRBE: session refused \(HTTP 200 at https:\/\/aps.bde.es\/h\)/,
    )
  })
})
