import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { aeatCartaPago } from './aeatCartaPago'

vi.mock('../../aeat/paymentLetter/generatePaymentLetter', () => ({
  generatePaymentLetter: vi.fn(async (_client: unknown, request: unknown) =>
    Promise.resolve({ request }),
  ),
}))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }
const valid = {
  nif: '00000000T',
  clave: 'A0000000000000001',
  importe: '100,00',
}

describe('aeatCartaPago', () => {
  it('is a write command that says generating pays nothing', () => {
    expect(aeatCartaPago.effect).toBe('write')
    expect(aeatCartaPago.description).toMatch(/pays nothing/)
  })

  it('validates --nif, --clave and --importe', async () => {
    await expect(aeatCartaPago.run(client, {})).rejects.toThrow('--nif')
    await expect(
      aeatCartaPago.run(client, { ...valid, clave: 'x' }),
    ).rejects.toThrow('--clave')
    await expect(
      aeatCartaPago.run(client, { ...valid, importe: '100.00' }),
    ).rejects.toThrow('--importe')
  })

  it('passes the request through, confirmed only with --confirmar si', async () => {
    const planned = (await aeatCartaPago.run(client, valid)) as {
      request: { confirm: boolean }
    }
    expect(planned.request).toEqual({
      ...valid,
      outDir: undefined,
      confirm: false,
    })
    const confirmed = (await aeatCartaPago.run(client, {
      ...valid,
      confirmar: 'si',
    })) as { request: { confirm: boolean } }
    expect(confirmed.request.confirm).toBe(true)
  })
})
