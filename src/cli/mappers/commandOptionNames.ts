import type { Command } from '../types/Command'

/** The options a command accepts: its own, plus `--confirmar` when it writes. */
export const commandOptionNames = (command: Command): readonly string[] =>
  command.effect === 'write'
    ? [...command.options, 'confirmar']
    : command.options
