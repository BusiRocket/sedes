import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { dehuUrls } from './dehuUrls'
import { fetchClaveLoginForm } from './fetchClaveLoginForm'

const page = (text: string): HttpResponse => ({
  status: 200,
  url: dehuUrls.loginClaveForm,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('fetchClaveLoginForm', () => {
  it('parses the JSON-wrapped form and requests it with the public-page referer', async () => {
    const html = `<form action="${dehuUrls.base}/dummy"><input type="hidden" name="SAMLRequest" value="req1"></form>`
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(JSON.stringify(html)))
    const client: HttpClient = { request, cookie: () => undefined }
    const form = await fetchClaveLoginForm(client)
    expect(form.fields).toEqual({ SAMLRequest: 'req1' })
    expect(request).toHaveBeenCalledWith(dehuUrls.loginClaveForm, {
      referer: dehuUrls.publicPage,
    })
  })

  it('rejects a response that is not a JSON string', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(JSON.stringify({ not: 'a string' })))
    const client: HttpClient = { request, cookie: () => undefined }
    await expect(fetchClaveLoginForm(client)).rejects.toThrow(
      'did not return a JSON string',
    )
  })

  it('rejects a form-less page', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page(JSON.stringify('<p>no form here</p>')))
    const client: HttpClient = { request, cookie: () => undefined }
    await expect(fetchClaveLoginForm(client)).rejects.toThrow('no login form')
  })
})
