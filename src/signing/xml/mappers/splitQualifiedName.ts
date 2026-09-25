/** Split `prefix:local` into its parts; an unprefixed name has the empty prefix. */
export const splitQualifiedName = (
  name: string,
): { readonly prefix: string; readonly local: string } => {
  const colon = name.indexOf(':')
  return colon === -1
    ? { prefix: '', local: name }
    : { prefix: name.slice(0, colon), local: name.slice(colon + 1) }
}
