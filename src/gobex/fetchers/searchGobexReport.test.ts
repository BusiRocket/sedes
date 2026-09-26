import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpResponse } from '../../http/types/HttpResponse'
import { searchGobexReport } from './searchGobexReport'

const url = 'https://sede.gobex.es/SEDE/privado/ciudadanos/MisPagos.jsf'

const answer = (text: string, status = 200): HttpResponse => ({
  status,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const searchPage =
  '<form id="f" action="MisPagos.jsf"><input type="hidden" name="f" value="f"/><input type="image" src="/i/bt_buscar.gif" name="f:b"/></form>'

const table = (id: string, rows: string[]): string =>
  `<table class="rich-table" id="${id}"><tbody>${rows.map((cell) => `<tr class="rich-table-row "><td>${cell}</td></tr>`).join('')}</tbody></table>`

const results = `<form id="f" action="MisPagos.jsf"><input type="hidden" name="f" value="f"/>
<div class="columnas_rejilla"><table><tr><td>Concepto</td></tr></table></div>${table('f:grid', ['a', 'b'])}
<script>new Richfaces.Datascroller('f:pages', function(event){A4J.AJAX.Submit('f',event,{})});</script></form>
<div class="columnas_rejilla"><table><tr><td>Imp. pendiente</td></tr></table></div>${table('panelModelo:tablaIncidencias', ['382,18'])}`

const clientAnswering = (...texts: HttpResponse[]): HttpClient => {
  const request = vi.fn<HttpClient['request']>()
  for (const text of texts) request.mockResolvedValueOnce(text)
  return { request, cookie: () => undefined }
}

describe('searchGobexReport', () => {
  it('collects every page until one repeats, plus the other grids', async () => {
    const client = clientAnswering(
      answer(searchPage),
      answer(results),
      answer(table('f:grid', ['c'])),
      answer(table('f:grid', ['a', 'b'])),
    )
    const filters = vi.fn(() => ({ 'f:year': '2026' }))
    const search = await searchGobexReport(client, url, filters)
    expect(filters).toHaveBeenCalledWith('f')
    expect(search).toEqual({
      rows: [{ concept: 'a' }, { concept: 'b' }, { concept: 'c' }],
      otherGrids: { tablaIncidencias: [{ pendingAmount: '382,18' }] },
    })
  })

  it('refuses a page without a search form', async () => {
    await expect(
      searchGobexReport(clientAnswering(answer('<p/>')), url),
    ).rejects.toThrow('Junta: no search form')
  })

  it('reports a server error instead of an empty result', async () => {
    await expect(
      searchGobexReport(
        clientAnswering(answer(searchPage), answer('', 500)),
        url,
      ),
    ).rejects.toThrow('the sede answered 500')
  })

  it('refuses a result page without its grid', async () => {
    await expect(
      searchGobexReport(
        clientAnswering(answer(searchPage), answer('<p/>')),
        url,
      ),
    ).rejects.toThrow('answered no result grid')
  })
})
