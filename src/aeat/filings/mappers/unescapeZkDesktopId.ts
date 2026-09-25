/**
 * ZK writes the desktop id JS-escaped (`z_1hIcQx\x2DaFqdpE7q9bkQN4A`); the
 * portal expects the decoded form in `dtid`.
 */
export const unescapeZkDesktopId = (raw: string): string =>
  raw.replaceAll(/\\x([0-9A-Fa-f]{2})/g, (_, hex: string) =>
    String.fromCodePoint(Number.parseInt(hex, 16)),
  )
