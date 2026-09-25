import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { calendarioFiscal } from './calendarioFiscal'

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('calendarioFiscal', () => {
  it('runs offline', () => {
    expect(calendarioFiscal.needsCertificate).toBe(false)
  })

  it.each([{}, { ejercicio: '26' }])(
    'requires a four-digit --ejercicio (%o)',
    async (options) => {
      await expect(calendarioFiscal.run(client, options)).rejects.toThrow(
        /--ejercicio is required/,
      )
    },
  )

  it('passes the year, modelo and period through', async () => {
    const result = (await calendarioFiscal.run(client, {
      ejercicio: '2026',
      modelo: '303',
      periodo: '2T',
    })) as { plazos: readonly { presentacion: { hasta: string } }[] }
    expect(result.plazos.map((entry) => entry.presentacion.hasta)).toEqual([
      '2026-07-20',
    ])
  })

  it('refuses a year that was not verified', async () => {
    await expect(
      calendarioFiscal.run(client, { ejercicio: '2027' }),
    ).rejects.toThrow(/not verified against the AEAT/)
  })
})
