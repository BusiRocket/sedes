import { describe, expect, it } from 'vitest'

import { findMatchingForm } from './findMatchingForm'

describe('findMatchingForm', () => {
  it('returns the first form block satisfying the predicate', () => {
    const html =
      '<form action="/a"><input name="lang" value="es"></form>' +
      '<form action="/b"><input name="target" value="yes"></form>'
    const block = findMatchingForm(html, (form) => form.includes('target'))
    expect(block).toContain('action="/b"')
  })

  it('returns undefined when no form matches', () => {
    const html = '<form action="/a"><input name="lang" value="es"></form>'
    expect(
      findMatchingForm(html, (form) => form.includes('nope')),
    ).toBeUndefined()
  })
})
