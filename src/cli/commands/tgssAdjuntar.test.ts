import { describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../../http/types/HttpClient'
import { writeTestPdf } from '../../tgss/attachments/fixtures/writeTestPdf'
import { tgssAdjuntar } from './tgssAdjuntar'

const request = vi.fn()
const client: HttpClient = { request, cookie: () => undefined }

describe('tgssAdjuntar', () => {
  it('is a write command', () => {
    expect(tgssAdjuntar.effect).toBe('write')
  })

  it('validates the options first', async () => {
    await expect(tgssAdjuntar.run(client, {})).rejects.toThrow(
      /--expediente is required/,
    )
  })

  it('plans without touching the network, and refuses to confirm', async () => {
    const documento = await writeTestPdf('doc.pdf')
    const options = { expediente: '1', documento, tipo: '1006' }
    await expect(tgssAdjuntar.run(client, options)).resolves.toMatchObject({
      executed: false,
    })
    await expect(
      tgssAdjuntar.run(client, { ...options, confirmar: 'si' }),
    ).rejects.toThrow(/cannot submit yet/)
    expect(request).not.toHaveBeenCalled()
  })
})
