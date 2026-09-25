import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import type { HttpRequestOptions } from '../../http/types/HttpRequestOptions'
import { appearAtNotification } from './appearAtNotification'

const pendingRow =
  "<tr id='filaNum0'><td><a href='DetalleSede?ncc=123456'>123456</a></td><td>LIQ</td><td></td><td></td><td></td><td>20-09-2026</td><td></td><td></td><td>No</td></tr>"

const portal = (): ReturnType<typeof vi.fn<HttpClient['request']>> =>
  vi.fn<HttpClient['request']>(
    async (url: string, options?: HttpRequestOptions) => {
      const text = url.includes('SvInteresadosQuery')
        ? pendingRow
        : options?.form?.['accion'] === 'firma'
          ? '<p>Concepto: LIQ</p>'
          : "<script>_fbNif='00000000T';_fbNombre='ANA';</script>"
      return Promise.resolve({
        status: 200,
        url,
        headers: {},
        body: Buffer.from(text),
        text,
      })
    },
  )

const today = new Date(2026, 8, 26)

describe('appearAtNotification', () => {
  it('only reads without confirmation', async () => {
    const request = portal()
    const result = await appearAtNotification(
      { request, cookie: () => undefined },
      { nif: '00000000T', ncc: '123456', confirm: false },
      today,
    )
    expect(result.executed).toBe(false)
    expect(result.pending.map((row) => row.ncc)).toEqual(['123456'])
    expect(result.plan.length).toBeGreaterThan(0)
    const urls = request.mock.calls.map(([url]) => url)
    expect(urls.some((url) => url.includes('DetalleSede'))).toBe(false)
  })

  it('does not act on a notification that is not pending', async () => {
    const request = portal()
    const result = await appearAtNotification(
      { request, cookie: () => undefined },
      { nif: '00000000T', ncc: '999999', confirm: true },
      today,
    )
    expect(result.executed).toBe(false)
    expect(result.notes[0]).toMatch(/not pending/)
  })

  it('appears when confirmed', async () => {
    const request = portal()
    const result = await appearAtNotification(
      { request, cookie: () => undefined },
      { nif: '00000000T', ncc: '123456', confirm: true },
      today,
    )
    expect(result.executed).toBe(true)
    expect(result.receipt).toMatchObject({ ncc: '123456', concepto: 'LIQ' })
  })

  it('defaults today to now', async () => {
    const result = await appearAtNotification(
      { request: portal(), cookie: () => undefined },
      { nif: '00000000T', confirm: false },
    )
    expect(result.action).toMatch(/none chosen/)
  })
})
