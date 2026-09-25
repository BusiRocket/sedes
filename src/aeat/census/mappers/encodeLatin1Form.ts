import type { FormFieldPair } from '../types/FormFieldPair'
import { encodeLatin1Value } from './encodeLatin1Value'

/** `name=value&...` encoded in Latin-1 (fProcedimiento carries accents; UTF-8 answers "datos inconsistentes"). */
export const encodeLatin1Form = (pairs: readonly FormFieldPair[]): string =>
  pairs
    .map(
      ([name, value]) =>
        `${encodeLatin1Value(name)}=${encodeLatin1Value(value)}`,
    )
    .join('&')
