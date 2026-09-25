import { describe, expect, it } from 'vitest'

import { parseNoDebtsHint } from './parseNoDebtsHint'

describe('parseNoDebtsHint', () => {
  it('reads the notice between Avisos and the footer', () => {
    const html = `
      <li><strong>Nombre:</strong> ACME SL</li>
      Avisos No existen deudas para mostrar Agencia Tributaria Accesibilidad
    `
    expect(parseNoDebtsHint(html)).toBe('No existen deudas para mostrar')
  })

  it('returns undefined when the page carries no Avisos section', () => {
    expect(parseNoDebtsHint('<table><tr><td>x</td></tr></table>')).toBe(
      undefined,
    )
  })
})
