import { describe, expect, it } from 'vitest'

import { parseMainText } from './parseMainText'

describe('parseMainText', () => {
  it('quotes the contenido block without scripts, tags or the footer', () => {
    const html =
      '<div id="cookies">Aceptar cookies</div>' +
      '<div id="contenido2" class="x"><script>var a=1</script><h1>Consulta</h1>' +
      '<p>No consta ning&uacute;n derecho   reconocido.</p></div>' +
      '<div id="pie">SEPE 2026</div>'

    expect(parseMainText(html)).toBe(
      'Consulta No consta ningún derecho reconocido.',
    )
  })

  it('falls back to the whole page when there is no contenido block', () => {
    expect(parseMainText('<p>Acceso  denegado</p>')).toBe('Acceso denegado')
  })
})
