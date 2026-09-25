import { describe, expect, it } from 'vitest'

import { assertOfferedYear } from './assertOfferedYear'

const select =
  '<cAnio><ELEMENTO><CODELEMENTO>2026</CODELEMENTO></ELEMENTO><ELEMENTO><CODELEMENTO>1999</CODELEMENTO></ELEMENTO></cAnio>'

describe('assertOfferedYear', () => {
  it('accepts an offered year, or any year when the screen lists none', () => {
    expect(() => {
      assertOfferedYear(select, '2026')
    }).not.toThrow()
    expect(() => {
      assertOfferedYear('<x/>', '1980')
    }).not.toThrow()
  })

  it('names the offered range when the year is missing', () => {
    expect(() => {
      assertOfferedYear(select, '1998')
    }).toThrow(/ejercicio 1998 is not offered \(1999-2026\)/)
  })

  it('refuses anything that is not four digits', () => {
    expect(() => {
      assertOfferedYear(select, '26')
    }).toThrow(/year as AAAA/)
  })
})
