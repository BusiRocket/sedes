import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { submitImageButton } from './submitImageButton'

const url = 'https://sede.gobex.es/SEDE/estructura/accesoClave.jsf'

const page = (text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('submitImageButton', () => {
  it('posts the form with the filters and the click coordinates', async () => {
    const request = vi.fn<HttpClient['request']>().mockResolvedValue(page(''))
    await submitImageButton(
      { request, cookie: () => undefined },
      page(
        '<form id="f" action="/SEDE/x.jsf"><input type="hidden" name="f" value="f"/><input type="image" src="/i/bt_continuar.gif" name="f:go"/></form>',
      ),
      'bt_continuar',
      { 'f:year': '2026' },
    )
    expect(request).toHaveBeenCalledWith('https://sede.gobex.es/SEDE/x.jsf', {
      timeoutMs: 180_000,
      method: 'POST',
      form: { f: 'f', 'f:year': '2026', 'f:go.x': '10', 'f:go.y': '10' },
      referer: url,
    })
  })

  it('refuses a page without the button', async () => {
    const request = vi.fn<HttpClient['request']>()
    await expect(
      submitImageButton(
        { request, cookie: () => undefined },
        page('<p/>'),
        'bt_buscar',
      ),
    ).rejects.toThrow('Junta: no bt_buscar button')
  })
})
