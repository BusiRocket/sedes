import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { writeTestPdf } from '../../tgss/attachments/fixtures/writeTestPdf'
import { tgssAplazamiento } from './tgssAplazamiento'

const request = vi.fn()
const client: HttpClient = { request, cookie: () => undefined }

describe('tgssAplazamiento', () => {
  it('is a write command', () => {
    expect(tgssAplazamiento.effect).toBe('write')
  })

  it('plans without touching the network', async () => {
    const documento = await writeTestPdf('sepa.pdf')
    const result = await tgssAplazamiento.run(client, {
      nif: '00000000T',
      plazos: '12',
      garantia: 'exenta',
      documento,
    })
    expect(result).toMatchObject({ executed: false })
    expect(request).not.toHaveBeenCalled()
  })

  it('refuses a confirmed submission without touching the network', async () => {
    const documento = await writeTestPdf('sepa.pdf')
    await expect(
      tgssAplazamiento.run(client, {
        nif: '00000000T',
        plazos: '12',
        garantia: 'exenta',
        documento,
        confirmar: 'si',
      }),
    ).rejects.toThrow(/cannot submit yet/)
    expect(request).not.toHaveBeenCalled()
  })
})
