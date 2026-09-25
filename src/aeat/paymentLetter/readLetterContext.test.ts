import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { readLetterContext } from './readLetterContext'

describe('readLetterContext', () => {
  it('reads debts, the token and the unread notifications', async () => {
    const request = vi.fn<HttpClient['request']>(async (url) => {
      const text = url.includes('ConsultaDdas')
        ? "<tr><td>A0000000000000001</td><td>IRPF</td><td>2025</td><td>1.000,00</td></tr><script>jQuery('#pUV').val('AA11');</script>"
        : "<tr id='filaNum0'><td><a href='DetalleSede?ncc=123456'>1</a></td><td>x</td><td></td><td></td><td></td><td></td><td></td><td></td><td>No</td></tr>"
      return Promise.resolve({
        status: 200,
        url,
        headers: {},
        body: Buffer.from(text),
        text,
      })
    })
    const context = await readLetterContext(
      { request, cookie: () => undefined },
      '00000000T',
      new Date(2026, 8, 26),
    )
    expect(context.debts.map((debt) => debt.clave)).toEqual([
      'A0000000000000001',
    ])
    expect(context.puv).toBe('AA11')
    expect(context.pendingNotifications).toBe(1)
  })
})
