/**
 * The largest response body, compressed or not, the client will hold in
 * memory. The biggest real documents (DEHU attachments, TGSS reports) are a
 * few megabytes; this bounds a hostile or broken response.
 */
export const maxBodyBytes = 64 * 1024 * 1024
