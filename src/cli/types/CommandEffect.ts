/**
 * What running a command does beyond reading:
 * - `read`: only reads (the default when a command declares nothing).
 * - `emit`: asks the portal to generate a document (a report or a certificate); changes nothing, may count against a daily cap.
 * - `sign`: signs a local file with the holder's key; talks to no portal.
 * - `write`: an act with effect at the administration (files, registers, accepts, requests); runs only with `--confirmar si`.
 */
export type CommandEffect = 'read' | 'emit' | 'sign' | 'write'
