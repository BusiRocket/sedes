import { describe, expect, it } from 'vitest'

import { readProcessingInstruction } from './readProcessingInstruction'

const read = (text: string): ReturnType<typeof readProcessingInstruction> =>
  readProcessingInstruction({ text, position: 0 })

describe('readProcessingInstruction', () => {
  it('splits target and data, keeping trailing data whitespace', () => {
    expect(read('<?style  href="a"  ?>')).toEqual({
      kind: 'pi',
      target: 'style',
      data: 'href="a"  ',
    })
  })
  it('answers empty data', () => {
    expect(read('<?pi   ?>').data).toBe('')
  })
  it('refuses the reserved and empty targets', () => {
    expect(() => read('<?XML a?>')).toThrow('invalid processing instruction')
    expect(() => read('<? a?>')).toThrow('invalid processing instruction')
  })
})
