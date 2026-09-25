import { describe, expect, it } from 'vitest'

import { parseFirstForm } from './parseFirstForm'
import { parseForms } from './parseForms'

const page = `
<html><body>
<form id="relay" method="post" action='/Proxy2/ServiceProvider'>
  <input type="hidden" name="SAMLRequest" value="PHNhbWw+&amp;x" />
  <input type='hidden' name='RelayState' value='abc'>
  <input type="hidden" NAME="empty">
  <input type="submit" value="Continuar">
</form>
<form action="https://other.example/post">
  <input name="a" value="1"/>
</form>
</body></html>`

describe('parseForms', () => {
  it('reads every form with its absolute action and decoded fields', () => {
    const forms = parseForms(page, 'https://pasarela.clave.gob.es/Proxy2/x')
    expect(forms).toHaveLength(2)
    expect(forms[0]).toEqual({
      action: 'https://pasarela.clave.gob.es/Proxy2/ServiceProvider',
      fields: { SAMLRequest: 'PHNhbWw+&x', RelayState: 'abc', empty: '' },
    })
    expect(forms[1]?.action).toBe('https://other.example/post')
  })

  it('posts back to the page when the form has no action', () => {
    const form = parseFirstForm(
      '<form><input name="t" value="1"></form>',
      'https://sede.example/page?x=1',
    )
    expect(form?.action).toBe('https://sede.example/page?x=1')
  })

  it('answers undefined for a page without forms', () => {
    expect(parseFirstForm('<p>no form</p>', 'https://x.example/')).toBe(
      undefined,
    )
  })
})
