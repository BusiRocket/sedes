import { attributeNamespace } from '../mappers/attributeNamespace'
import { baseNamespaceScope } from '../mappers/baseNamespaceScope'
import { extendNamespaceScope } from '../mappers/extendNamespaceScope'
import { isNamespaceDeclaration } from '../mappers/isNamespaceDeclaration'
import { splitQualifiedName } from '../mappers/splitQualifiedName'
import type { NamespaceScope } from '../types/NamespaceScope'
import type { XmlElement } from '../types/XmlElement'

/** Fail when an element or attribute uses a prefix no ancestor declared. */
export const assertNamespacesResolve = (root: XmlElement): void => {
  const pending: [XmlElement, NamespaceScope][] = [[root, baseNamespaceScope()]]
  for (let item = pending.pop(); item !== undefined; item = pending.pop()) {
    const [element, outer] = item
    const scope = extendNamespaceScope(outer, element)
    const { prefix } = splitQualifiedName(element.name)
    const names = element.attributes
      .map((attribute) => attribute.name)
      .filter((name) => !isNamespaceDeclaration(name))
    const unresolved =
      (prefix !== '' && !scope.has(prefix)) ||
      names.some((name) => attributeNamespace(name, scope) === undefined)
    if (unresolved)
      throw new Error(`xml: undeclared namespace prefix in <${element.name}>`)
    for (const child of element.children)
      if (child.kind === 'element') pending.push([child, scope])
  }
}
