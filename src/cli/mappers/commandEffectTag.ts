import type { Command } from '../types/Command'

/** The usage-line tag that tells the reader a command does more than read. */
export const commandEffectTag = (command: Command): string => {
  if (command.effect === 'write') return ' [WRITE: needs --confirmar si]'
  if (command.effect === 'emit') return ' [emits a document]'
  if (command.effect === 'sign') return ' [signs locally]'
  return ''
}
