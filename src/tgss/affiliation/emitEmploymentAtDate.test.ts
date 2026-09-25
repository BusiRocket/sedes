import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { emitAffiliationReport } from './emitAffiliationReport'
import { emitEmploymentAtDate } from './emitEmploymentAtDate'

vi.mock('./emitAffiliationReport', () => ({ emitAffiliationReport: vi.fn() }))

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('emitEmploymentAtDate', () => {
  it('presses ACEPTAR_INFORME_FECHA_CONCRETA with the date and echoes it', async () => {
    vi.mocked(emitAffiliationReport).mockResolvedValue({
      messages: ['Informe generado correctamente.'],
      notes: ['n'],
      secuencial: '1',
    })

    const result = await emitEmploymentAtDate(client, '25/09/2026', '/out')

    expect(result).toEqual({
      messages: ['Informe generado correctamente.'],
      notes: ['n'],
      secuencial: '1',
      fecha: '25/09/2026',
    })
    expect(emitAffiliationReport).toHaveBeenCalledWith(
      client,
      expect.objectContaining({
        app: 'INAF0009',
        kind: 'alta',
        action: 'ACEPTAR_INFORME_FECHA_CONCRETA',
        fields: { fecha: '25/09/2026' },
      }),
      '/out',
    )
  })

  it('refuses a date that is not DD/MM/AAAA before touching the portal', async () => {
    vi.mocked(emitAffiliationReport).mockClear()

    await expect(
      emitEmploymentAtDate(client, '2026-09-25', undefined),
    ).rejects.toThrow(/DD\/MM\/AAAA/)
    expect(emitAffiliationReport).not.toHaveBeenCalled()
  })
})
