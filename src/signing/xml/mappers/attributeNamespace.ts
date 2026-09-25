import type { NamespaceScope } from '../types/NamespaceScope'
import { splitQualifiedName } from './splitQualifiedName'

/** The namespace URI of an attribute name: none for an unprefixed attribute. */
export const attributeNamespace = (
  name: string,
  scope: NamespaceScope,
): string | undefined => {
  const { prefix } = splitQualifiedName(name)
  return prefix === '' ? '' : scope.get(prefix)
}
