import { describe, expect, it } from 'vitest'

import type { HttpResponse } from '../../http/types/HttpResponse'
import { requireFormByName } from './requireFormByName'

const page = (text: string): HttpResponse => ({
  status: 200,
  url: 'https://sede.sepe.gob.es/x.do',
  headers: {},
  body: Buffer.from(text),
  text,
})

describe('requireFormByName', () => {
  it('returns the named form', () => {
    const form = requireFormByName(
      page(
        '<form name="DSolicitudForm" action="/y.do"><input name="a" value="1"></form>',
      ),
      'DSolicitudForm',
    )

    expect(form.action).toBe('https://sede.sepe.gob.es/y.do')
  })

  it('names the page and the form when it is missing', () => {
    expect(() => requireFormByName(page('<p>denegado</p>'), 'X')).toThrow(
      'SEPE: no X form at https://sede.sepe.gob.es/x.do (200)',
    )
  })
})
