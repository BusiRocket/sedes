import type { SignatureDetails } from './SignatureDetails'

/** A signature's details and whether it shows a stamp on page 1. */
export type SignatureRequest = SignatureDetails & { readonly visible: boolean }
