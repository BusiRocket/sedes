import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/types/HttpClient'
import { listStaNotifications } from './listStaNotifications'

const session = '<a href="/sta/CarpetaPrivate/Logout?EXIT=true">Salir</a>'

const row = (reference: string): string =>
  `{"numReferencia":"${reference}","expediente":"2020/1X","reportDescription":"Requerimiento","actuacion":"Requerimiento","notifStatus":"Notificada","puestaDisp":"2020-10-21 19:49:35.0","statusDate":{"year":2020,"month":10,"day":21,"hour":19,"minute":49,"second":35},"personFullName":"CHRISTIAN"}`

const fakeRequest = () =>
  vi.fn<HttpClient['request']>().mockImplementation(async (url, options) => {
    const form = options?.form
    let text = `${session}<script>var ds_NOTIFICACIONES_PENDIENTE = [${row('P1')}];</script>`
    if (url.includes('submitAjax')) {
      const name = `${form?.['eventObject'] === 'REP_TABBER' ? 'REP_' : ''}${(form?.['eventArguments'] ?? '').replace('SELECTED=', '')}`
      text =
        name === 'REP_ACEPTADA'
          ? `var ds_NOTIFICACIONES_${name} = [${row('R1')}];`
          : ''
    }
    return Promise.resolve({
      status: 200,
      url,
      headers: {},
      body: Buffer.from(text),
      text,
    })
  })

describe('listStaNotifications', () => {
  it('lists every tab and counts the pending ones, opening none', async () => {
    const request = fakeRequest()
    const client: HttpClient = { request, cookie: () => undefined }
    const result = await listStaNotifications(client, 'caceres')
    expect(result.host).toBe('sede.caceres.es')
    expect(result.pending).toBe(1)
    expect(result.notifications).toEqual([
      expect.objectContaining({
        role: 'interesado',
        tab: 'pendiente',
        reference: 'P1',
      }),
      {
        role: 'representante',
        tab: 'aceptada',
        reference: 'R1',
        expediente: '2020/1X',
        subject: 'Requerimiento',
        action: 'Requerimiento',
        status: 'Notificada',
        madeAvailableAt: '2020-10-21T19:49:35',
        resolvedAt: '2020-10-21T19:49:35',
        recipient: 'CHRISTIAN',
      },
    ])
    const calls = vi.mocked(request).mock.calls
    expect(calls.filter(([url]) => url.includes('submitAjax'))).toHaveLength(4)
  })
})
