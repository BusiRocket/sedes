import { canonicalizeSubtree } from '../../xml/mappers/canonicalizeSubtree'
import type { XmlElement } from '../../xml/types/XmlElement'

/** A built element as canonical text, for assertions. */
export const renderTestElement = (element: XmlElement): string =>
  canonicalizeSubtree([element], { withComments: false, exclusive: false })
