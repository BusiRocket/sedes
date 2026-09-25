/** A read position inside the PDF's latin1 text, where one char is one byte. */
export type PdfCursor = { readonly text: string; pos: number }
