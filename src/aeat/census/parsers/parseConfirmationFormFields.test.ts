import { describe, expect, it } from 'vitest'

import { parseConfirmationFormFields } from './parseConfirmationFormFields'

const html = `
<form id='Other'><input type='hidden' name='outside' value='x'></form>
<form method='post' id='Form' action='ServletSitCenInternet'>
<input type='hidden' name='fProcedimiento' value='Certificados de situación censal'>
<input type='text' name='FIRNIF' value=''>
<input type='hidden' name='FIR' value=''>
<input type='submit' name='firmar' value='Firmar'>
<input type='checkbox' name='acepto' value='1'>
<input type='hidden' value='nameless'>
</form>`

describe('parseConfirmationFormFields', () => {
  it('keeps hidden and text inputs of the Form in document order', () => {
    expect(parseConfirmationFormFields(html)).toEqual([
      ['fProcedimiento', 'Certificados de situación censal'],
      ['FIRNIF', ''],
      ['FIR', ''],
    ])
  })

  it('throws when the form is missing', () => {
    expect(() => parseConfirmationFormFields('<html></html>')).toThrow(
      /no <form id='Form'>/,
    )
  })
})
