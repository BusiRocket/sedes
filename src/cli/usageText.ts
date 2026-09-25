import type { Command } from './types/Command'

/** The help text: one line per command plus the global options. */
export const usageText = (commands: readonly Command[]): string =>
  [
    'sedes - read-only client for the Spanish public administration portals',
    '',
    'usage: sedes <portal> <action> [--cert cert.pem --key key.pem] [--out dir] [options]',
    '',
    ...commands.map(
      (command) =>
        `  ${command.portal} ${command.action}`.padEnd(24) +
        command.description +
        (command.options.length > 0
          ? ` (${command.options.map((option) => `--${option}`).join(', ')})`
          : ''),
    ),
    '',
    'The certificate and key are PEM files, also read from SEDES_CERT and SEDES_KEY.',
    'Every command is read-only: nothing is filed, paid, signed or accepted.',
  ].join('\n')
