import { derNode } from './derNode'

/**
 * DER SET OF: the encoded children sorted by their encodings, as DER requires.
 * `tag` defaults to the universal SET (0x31); `[0] IMPLICIT SET OF` passes 0xa0.
 */
export const derSetOf = (children: readonly Buffer[], tag = 0x31): Buffer =>
  derNode(
    tag,
    Buffer.concat(
      [...children].sort((left, right) => Buffer.compare(left, right)),
    ),
  )
