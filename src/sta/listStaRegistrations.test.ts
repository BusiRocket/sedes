import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/types/HttpClient'
import { listStaRegistrations } from './listStaRegistrations'

const session = '<a href="/sta/CarpetaPrivate/Logout?EXIT=true">Salir</a>'

const fakeClient = (): HttpClient => ({
  request: vi.fn<HttpClient['request']>().mockImplementation(async (url) => {
    const text = url.includes('submitAjax')
      ? 'var ds_ANOTACION_REPRESENTANTE = [{"ANNOTNUMBER":"2","ANNOTTS":"21/11/2025 12:51:30","ANNOTGROUPDESC":"Licencias","ABSTRACT":"Subsanación"}];'
      : `${session}<script>var ds_ANOTACION_INTERESADO = [{"ANNOTNUMBER":"1","ANNOTTS":"08/10/2024 12:26:45","ANNOTGROUPDESC":"Intervención","ABSTRACT":"Factura"}];</script>`
    return Promise.resolve({
      status: 200,
      url,
      headers: {},
      body: Buffer.from(text),
      text,
    })
  }),
  cookie: () => undefined,
})

describe('listStaRegistrations', () => {
  it('lists own entries and those filed as representative', async () => {
    const result = await listStaRegistrations(fakeClient(), 'caceres')
    expect(result).toEqual({
      host: 'sede.caceres.es',
      registrations: [
        {
          role: 'interesado',
          number: '1',
          registeredAt: '2024-10-08T12:26:45',
          unit: 'Intervención',
          summary: 'Factura',
        },
        {
          role: 'representante',
          number: '2',
          registeredAt: '2025-11-21T12:51:30',
          unit: 'Licencias',
          summary: 'Subsanación',
        },
      ],
    })
  })
})
