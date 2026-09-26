import { describe, expect, it, vi } from 'vitest'

import { listJuntaPayments } from '../../gobex/listJuntaPayments'
import { juntaPagos } from './juntaPagos'

vi.mock('../../gobex/listJuntaPayments', () => ({ listJuntaPayments: vi.fn() }))

describe('juntaPagos', () => {
  it('declares its shape and delegates', async () => {
    expect(juntaPagos.portal).toBe('junta')
    expect(juntaPagos.action).toBe('pagos')
    vi.mocked(listJuntaPayments).mockResolvedValue({} as never)
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaPagos.run(client, {})
    expect(listJuntaPayments).toHaveBeenCalled()
  })
})

describe('juntaPagos --ejercicio', () => {
  it('passes the requested year', async () => {
    const client = { request: vi.fn(), cookie: () => undefined }
    await juntaPagos.run(client, { ejercicio: '2020' })
    expect(listJuntaPayments).toHaveBeenLastCalledWith(client, '2020')
  })
})
