import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import type { HttpResponse } from '../http/HttpResponse'
import { listOargtReceipts } from './listOargtReceipts'

const page = (url: string, text: string): HttpResponse => ({
  status: 200,
  url,
  headers: {},
  body: Buffer.from(text),
  text,
})

const recibosUrl =
  'https://sede.oargt.es/sta/CarpetaPrivate/doEvent?PAGE_CODE=RECIBOS'

const voluntariaRow =
  '{"referen":"117","render_situacion":"Voluntaria","intypename":"Tasas","entityname":"AYUNTAMIENTO DE EJEMPLO","importePrincipal":158.24,"importePendiente":"158.24","isDomiciliado":true,"isCobrado":false}'

const ejecutivaRow =
  '{"referen":"6343HNW","render_situacion":"Ejecutiva","intypename":"IVTM","entityname":"CACERES","importePrincipal":140,"importePendiente":"140.0","isDomiciliado":false,"paseje":"23/06/2026","isCobrado":false}'

const pagadosRow =
  '{"referen":"9753DVD","render_situacion":"Voluntaria","intypename":"Tasas","entityname":"CACERES","importePrincipal":50,"importePendiente":"0.0","isDomiciliado":true,"isCobrado":true}'

describe('listOargtReceipts', () => {
  it('reports the contact-data prompt without touching any tab', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page('https://sede.oargt.es/public', '<p>ok</p>'))
      .mockResolvedValueOnce(
        page(
          recibosUrl,
          '<p>Proceda a Validar los datos referentes a Medios de Contacto y Datos Identificativos.</p>',
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const result = await listOargtReceipts(client, { includePaid: false })
    expect(result).toEqual({
      contactConfirmationPending: true,
      receipts: [],
      totals: { voluntaria: 0, ejecutiva: 0 },
      amountTodayAvailable: false,
      notes: [
        'the office asked to confirm contact data before showing receipts; this is a write and was left for the holder',
      ],
    })
    expect(request).toHaveBeenCalledTimes(2)
  })

  it('lists voluntaria and ejecutiva by default, without the pagados tab', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page('https://sede.oargt.es/public', '<p>ok</p>'))
      .mockResolvedValueOnce(
        page(
          recibosUrl,
          `<script>var dataset_DEUDAPENDIENTE = [${voluntariaRow}];</script>`,
        ),
      )
      .mockResolvedValueOnce(
        page(
          'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
          `<zones><script><![CDATA[var dataset_DEUDAPENDIENTE = [${ejecutivaRow}];]]></script></zones>`,
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const result = await listOargtReceipts(client, { includePaid: false })
    expect(request).toHaveBeenCalledTimes(3)
    expect(result.contactConfirmationPending).toBe(false)
    expect(result.receipts).toHaveLength(2)
    expect(result.receipts.map((receipt) => receipt.tab)).toEqual([
      'voluntaria',
      'ejecutiva',
    ])
    expect(result.totals).toEqual({ voluntaria: 158.24, ejecutiva: 140 })
    expect(result.amountTodayAvailable).toBe(false)
    expect(result.notes).toHaveLength(1)
  })

  it('also fetches the pagados tab when asked', async () => {
    const request = vi
      .fn<HttpClient['request']>()
      .mockResolvedValueOnce(page('https://sede.oargt.es/public', '<p>ok</p>'))
      .mockResolvedValueOnce(page(recibosUrl, '<p>no rows</p>'))
      .mockResolvedValueOnce(
        page(
          'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
          '<zones><script><![CDATA[no rows here]]></script></zones>',
        ),
      )
      .mockResolvedValueOnce(
        page(
          'https://sede.oargt.es/sta/CarpetaPrivate/submitAjax.aa',
          `<zones><script><![CDATA[var dataset_DEUDAPENDIENTE = [${pagadosRow}];]]></script></zones>`,
        ),
      )
    const client: HttpClient = { request, cookie: () => undefined }
    const result = await listOargtReceipts(client, { includePaid: true })
    expect(request).toHaveBeenCalledTimes(4)
    expect(request.mock.calls[3]?.[1]?.form?.['eventArguments']).toBe(
      'SELECTED=PAGADOS',
    )
    expect(result.receipts).toHaveLength(1)
    expect(result.receipts[0]?.tab).toBe('pagados')
    expect(result.receipts[0]?.paid).toBe(true)
    expect(result.totals).toEqual({ voluntaria: 0, ejecutiva: 0 })
  })
})
