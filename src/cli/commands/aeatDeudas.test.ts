import { describe, expect, it, vi } from 'vitest'

import { sweepAeatDebts } from '../../aeat/sweepAeatDebts'
import type { HttpClient } from '../../http/HttpClient'
import { aeatDeudas } from './aeatDeudas'

vi.mock('../../aeat/sweepAeatDebts', () => ({ sweepAeatDebts: vi.fn() }))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('aeatDeudas', () => {
  it('describes itself as the aeat deudas command taking --nif', () => {
    expect(aeatDeudas.portal).toBe('aeat')
    expect(aeatDeudas.action).toBe('deudas')
    expect(aeatDeudas.options).toEqual(['nif'])
  })

  it('rejects a call with no --nif', async () => {
    await expect(aeatDeudas.run(client, {})).rejects.toThrow(
      '--nif is required',
    )
  })

  it('delegates to sweepAeatDebts with the client and the given NIF', async () => {
    const report = {
      nif: '12345678Z',
      debts: [],
      agreements: [],
      totals: { pendiente: 0, aIngresar: 0 },
    }
    vi.mocked(sweepAeatDebts).mockResolvedValueOnce(report)
    const result = await aeatDeudas.run(client, { nif: '12345678Z' })
    expect(sweepAeatDebts).toHaveBeenCalledWith(client, '12345678Z')
    expect(result).toBe(report)
  })
})
