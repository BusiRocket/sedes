import type { NamespaceScope } from '../types/NamespaceScope'
import { xmlNamespaceUri } from '../xmlNamespaceUri'

/** The scope every document starts with: only `xml` is bound. */
export const baseNamespaceScope = (): NamespaceScope =>
  new Map([['xml', xmlNamespaceUri]])
