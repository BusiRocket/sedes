import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { fetchScrollerPage } from './fetchScrollerPage'

const url = 'https://sede.gobex.es/SEDE/privado/ciudadanos/x.jsf'

const page = (text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const scroller = { scrollerId: 'f:pages', formId: 'f' }

describe('fetchScrollerPage', () => {
  it('posts the A4J page request with the form fields', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue(page(''))
    await fetchScrollerPage(
      { request, cookie: () => undefined },
      page(
        '<form id="f" action="x.jsf"><input type="hidden" name="f" value="f"/></form>',
      ),
      scroller,
      3,
    )
    expect(request).toHaveBeenCalledWith(url, {
      timeoutMs: 180_000,
      method: 'POST',
      form: {
        f: 'f',
        AJAXREQUEST: '_viewRoot',
        'f:pages': '3',
        ajaxSingle: 'f:pages',
      },
      referer: url,
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
    })
  })

  it('refuses a page without the scroller form', async () => {
    const request = vi.fn<HttpClient['request']>()
    await expect(
      fetchScrollerPage(
        { request, cookie: () => undefined },
        page('<p/>'),
        scroller,
        2,
      ),
    ).rejects.toThrow('Junta: no form f to page with')
  })
})
