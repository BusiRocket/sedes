import type { XmlElement } from '../../xml/types/XmlElement'
import { buildElement } from './buildElement'
import { buildText } from './buildText'

/** An element holding only `text`. */
export const buildTextElement = (name: string, text: string): XmlElement =>
  buildElement(name, {}, [buildText(text)])
