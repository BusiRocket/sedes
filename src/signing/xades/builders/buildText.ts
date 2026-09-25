import type { XmlText } from '../../xml/types/XmlText'

/** A new text node (mutable, so a placeholder can be filled later). */
export const buildText = (value: string): XmlText => ({ kind: 'text', value })
