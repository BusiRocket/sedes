/**
 * Largest structural stream (xref or object stream) a PDF may inflate to.
 * Real ones are a few kilobytes; the cap stops a crafted stream from
 * exhausting memory when the holder signs a document someone sent them.
 */
export const maxDecodedStreamBytes = 64 * 1024 * 1024
