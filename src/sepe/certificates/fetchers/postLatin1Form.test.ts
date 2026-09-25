import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../../http/types/HttpClient'
import type { HttpResponse } from '../../../http/types/HttpResponse'
import { postLatin1Form } from './postLatin1Form'

const answer: HttpResponse = {
  status: 200,
  url: 'https://sede.sepe.gob.es/x.do',
  headers: {},
  body: Buffer.from(''),
  text: '',
}

describe('postLatin1Form', () => {
  it('posts the merged fields as a Latin-1 body with the caller headers', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValueOnce(answer)
    const client: HttpClient = { request, cookie: () => undefined }

    await postLatin1Form(
      client,
      { action: 'https://sede.sepe.gob.es/x.do', fields: { a: '1', tipo: '' } },
      { tipo: 'De situación' },
      { referer: 'https://sede.sepe.gob.es/prev.do', headers: { Origin: 'o' } },
    )

    expect(request).toHaveBeenCalledWith('https://sede.sepe.gob.es/x.do', {
      method: 'POST',
      body: 'a=1&tipo=De+situaci%F3n',
      defaultCharset: 'iso-8859-1',
      referer: 'https://sede.sepe.gob.es/prev.do',
      headers: { Origin: 'o' },
    })
  })
})
