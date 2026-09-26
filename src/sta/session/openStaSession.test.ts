import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { openStaSession } from './openStaSession'

const origin = 'https://sede.caceres.es'

const answering = (url: string, text: string) =>
  vi.fn<HttpClient['request']>().mockResolvedValue({
    status: 200,
    url,
    headers: {},
    body: Buffer.from(text),
    text,
  } satisfies HttpResponse)

const clientOf = (request: HttpClient['request']): HttpClient => ({
  request,
  cookie: () => undefined,
})

describe('openStaSession', () => {
  it('logs in with the certificate', async () => {
    const request = answering(
      `${origin}/sta/CarpetaPrivate/doEvent?PAGE_CODE=HOME`,
      '<a href="/sta/CarpetaPrivate/Logout?EXIT=true">Salir</a>',
    )
    await openStaSession(clientOf(request), origin)
    expect(request).toHaveBeenCalledWith(
      `${origin}/sta/CarpetaPrivate/Certificate?APP_CODE=STA&PAGE_CODE=HOME`,
    )
  })

  it('stops at the contact-data gate without saving it', async () => {
    const request = answering(
      `${origin}/sta/CarpetaPrivate/doEvent?PAGE_CODE=CONFIRMACION_DATOS_PERSONALES`,
      '<a href="/sta/CarpetaPrivate/Logout?EXIT=true">Salir</a>',
    )
    await expect(openStaSession(clientOf(request), origin)).rejects.toThrow(
      'sede.caceres.es: the sede asks the holder to confirm contact data first',
    )
  })

  it('refuses a page without a session', async () => {
    const request = answering(`${origin}/sta/CarpetaPublic/`, '<p>Acceder</p>')
    await expect(openStaSession(clientOf(request), origin)).rejects.toThrow(
      'certificate login did not open a session',
    )
  })
})
