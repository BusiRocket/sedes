import { describe, expect, it } from 'vitest'

import { attachToExpediente } from './attachToExpediente'
import { writeTestPdf } from './fixtures/writeTestPdf'

describe('attachToExpediente', () => {
  it('returns the plan without executing when not confirmed', async () => {
    const documento = await writeTestPdf('justificante.pdf')
    const result = await attachToExpediente(
      { expediente: '000111', documento, tipo: '1008' },
      false,
    )
    expect(result.executed).toBe(false)
    expect(result.receipt).toBeUndefined()
    expect(result.plan.join('\n')).toContain('justificante.pdf')
    expect(result.notes[0]).toMatch(/No request was made/)
  })

  it('refuses to submit when confirmed, before any request', async () => {
    const documento = await writeTestPdf('justificante.pdf')
    await expect(
      attachToExpediente({ expediente: '1', documento, tipo: '1008' }, true),
    ).rejects.toThrow(/cannot submit yet.*Nothing was sent/)
  })

  it('refuses a file name CEUS would reject', async () => {
    const documento = await writeTestPdf(`${'n'.repeat(76)}.pdf`)
    await expect(
      attachToExpediente({ expediente: '1', documento, tipo: '1008' }, false),
    ).rejects.toThrow(/at most 79/)
  })
})
