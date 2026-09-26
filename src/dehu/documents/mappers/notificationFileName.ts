import type { DocumentKind } from '../types/DocumentKind'
import { fileSuffixFromName } from './fileSuffixFromName'
import { safeFileStem } from './safeFileStem'

/** `<identifier>_<kind>.<suffix>`: the file name a downloaded notification file is written under. */
export const notificationFileName = (
  identifier: string,
  kind: DocumentKind,
  portalName: string | undefined,
): string =>
  `${safeFileStem(identifier)}_${kind}.${fileSuffixFromName(portalName)}`
