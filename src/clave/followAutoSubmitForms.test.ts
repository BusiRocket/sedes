import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { followAutoSubmitForms } from './followAutoSubmitForms'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const relayForm = (action: string, value: string): string =>
  `<form action="${action}"><input type="hidden" name="SAMLResponse" value="${value}"></form>`

describe('followAutoSubmitForms', () => {
  it('posts each auto-submit form until a page without one', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(
        page('https://idp.example/a', relayForm('/b', 'two')),
      )
      .mockResolvedValueOnce(page('https://idp.example/b', '<p>landed</p>'))
    const client: HttpClient = { request, cookie: () => undefined }
    const start = page('https://sp.example/start', relayForm('/a', 'one'))
    const final = await followAutoSubmitForms(client, start)
    expect(final.text).toBe('<p>landed</p>')
    expect(request).toHaveBeenCalledTimes(2)
    expect(request.mock.calls[0]?.[1]).toMatchObject({
      method: 'POST',
      form: { SAMLResponse: 'one' },
    })
  })

  it('stops when the landing predicate says so', async () => {
    const request = vi.fn<HttpClient['request']>()
    const client: HttpClient = { request, cookie: () => undefined }
    const start = page('https://sp.example/start', relayForm('/a', 'one'))
    const final = await followAutoSubmitForms(client, start, (response) =>
      response.url.includes('start'),
    )
    expect(final).toBe(start)
    expect(request).not.toHaveBeenCalled()
  })

  it('gives up after the hop limit', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValue(page('https://loop.example/', relayForm('/', 'x')))
    const client: HttpClient = { request, cookie: () => undefined }
    const start = page('https://loop.example/', relayForm('/', 'x'))
    await followAutoSubmitForms(client, start)
    expect(request).toHaveBeenCalledTimes(12)
  })
})
