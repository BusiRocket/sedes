import type { NamespaceScope } from '../types/NamespaceScope'
import type { XmlElement } from '../types/XmlElement'
import { baseNamespaceScope } from './baseNamespaceScope'
import { extendNamespaceScope } from './extendNamespaceScope'

/** The namespace scope in force inside the last element of a root-to-element path. */
export const scopeOfPath = (path: readonly XmlElement[]): NamespaceScope =>
  path.reduce(extendNamespaceScope, baseNamespaceScope())
