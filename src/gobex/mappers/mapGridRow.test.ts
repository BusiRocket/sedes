import { describe, expect, it } from 'vitest'

import { mapGridRow } from './mapGridRow'

describe('mapGridRow', () => {
  it('keys cells by title and drops selection, action and untitled columns', () => {
    expect(
      mapGridRow(
        ['Selec.', 'Concepto', 'Importe', '', 'Acciones'],
        ['', 'ITV', '33,10', 'x'],
      ),
    ).toEqual({ concept: 'ITV', amount: '33,10' })
  })
})
