import { selectElementPath } from '../../xml/selectors/selectElementPath'
import type { XmlElement } from '../../xml/types/XmlElement'

/** The root-to-element path of the element whose `Id` attribute is `id`. */
export const selectPathById = (root: XmlElement, id: string): XmlElement[] => {
  const path = selectElementPath(root, (element) =>
    element.attributes.some(
      (attribute) => attribute.name === 'Id' && attribute.value === id,
    ),
  )
  if (path === undefined) throw new Error(`no element with Id "${id}"`)
  return path
}
