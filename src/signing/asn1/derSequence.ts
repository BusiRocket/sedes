import { derNode } from './derNode'

/** DER SEQUENCE of already encoded children, in order. */
export const derSequence = (children: readonly Buffer[]): Buffer =>
  derNode(0x30, Buffer.concat(children))
