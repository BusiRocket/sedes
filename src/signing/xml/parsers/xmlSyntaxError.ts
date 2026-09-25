import type { XmlCursor } from '../types/XmlCursor'

/** A parse error that names what was wrong and where. */
export const xmlSyntaxError = (cursor: XmlCursor, message: string): Error =>
  new Error(`xml: ${message} at offset ${String(cursor.position)}`)
