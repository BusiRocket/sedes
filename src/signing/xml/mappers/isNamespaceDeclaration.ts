/** True for `xmlns` and `xmlns:prefix` attributes. */
export const isNamespaceDeclaration = (name: string): boolean =>
  name === 'xmlns' || name.startsWith('xmlns:')
