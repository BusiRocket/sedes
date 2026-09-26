/**
 * A server-supplied identifier made safe as a file name stem: anything but
 * letters, digits, dot, dash and underscore becomes `_`, leading dots go, so
 * `../x` or `a/b` can never leave the output directory.
 */
export const safeFileStem = (identifier: string): string => {
  const stem = identifier.replace(/[^\w.-]/g, '_').replace(/^\.+/, '')
  return stem === '' ? 'notification' : stem
}
