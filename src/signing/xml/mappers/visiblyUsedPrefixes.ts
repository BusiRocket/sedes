import type { XmlElement } from '../types/XmlElement'
import { isNamespaceDeclaration } from './isNamespaceDeclaration'
import { splitQualifiedName } from './splitQualifiedName'

/** Prefixes the element and its attributes use (the default namespace as the empty prefix). */
export const visiblyUsedPrefixes = (element: XmlElement): Set<string> => {
  const used = new Set([splitQualifiedName(element.name).prefix])
  for (const { name } of element.attributes) {
    if (isNamespaceDeclaration(name)) continue
    const { prefix } = splitQualifiedName(name)
    if (prefix !== '') used.add(prefix)
  }
  used.delete('xml')
  return used
}
