import { describe, expect, it } from 'vitest'

import type { Command } from '../types/Command'
import { commandEffectTag } from './commandEffectTag'
import { commandOptionNames } from './commandOptionNames'

const base: Command = {
  portal: 'demo',
  action: 'x',
  description: 'd',
  options: ['nif'],
  run: async () => Promise.resolve(null),
}

describe('commandOptionNames and commandEffectTag', () => {
  it('adds --confirmar and a WRITE tag only to write commands', () => {
    expect(commandOptionNames(base)).toEqual(['nif'])
    expect(commandEffectTag(base)).toBe('')
    const write: Command = { ...base, effect: 'write' }
    expect(commandOptionNames(write)).toEqual(['nif', 'confirmar'])
    expect(commandEffectTag(write)).toContain('--confirmar si')
  })

  it('tags emitting and signing commands', () => {
    expect(commandEffectTag({ ...base, effect: 'emit' })).toContain('emits')
    expect(commandEffectTag({ ...base, effect: 'sign' })).toContain('signs')
  })
})
