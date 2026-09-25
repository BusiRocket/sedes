import { derLength } from './derLength'

/** One DER tag-length-value element with the given identifier octet. */
export const derNode = (tag: number, content: Buffer): Buffer =>
  Buffer.concat([Buffer.from([tag]), derLength(content.length), content])
