import { describe, expect, it } from 'vitest'

import { paginationFields } from './paginationFields'

describe('paginationFields', () => {
  it('describes a single page', () => {
    expect(paginationFields).toEqual({
      'Paginacion.PaginaActual': '1',
      'Paginacion.NumeroPaginas': '1',
      'Paginacion.NumeroRegistros': '1',
    })
  })
})
