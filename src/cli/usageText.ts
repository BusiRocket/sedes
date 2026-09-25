import { commandEffectTag } from './mappers/commandEffectTag'
import { commandOptionNames } from './mappers/commandOptionNames'
import type { Command } from './types/Command'

/** The help text: one line per command plus the global options. */
export const usageText = (commands: readonly Command[]): string =>
  [
    'papeleo - client for the Spanish public administration portals, with your own certificate',
    '',
    'usage: papeleo <portal> <action> [--cert cert.pem --key key.pem] [--out dir] [options]',
    '',
    ...commands.map(
      (command) =>
        `  ${command.portal} ${command.action}`.padEnd(24) +
        command.description +
        commandEffectTag(command) +
        (commandOptionNames(command).length > 0
          ? ` (${commandOptionNames(command)
              .map((option) => `--${option}`)
              .join(', ')})`
          : ''),
    ),
    '',
    'The certificate and key are PEM files, also read from PAPELEO_CERT and PAPELEO_KEY.',
    'Reads are the default. A [WRITE] command only prepares and prints its plan unless --confirmar si is given.',
  ].join('\n')
