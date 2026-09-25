import { derNode } from './derNode'

/**
 * Context-specific element `[n]`, constructed: for an EXPLICIT tag pass the
 * encoded inner element; for an IMPLICIT constructed tag pass the inner content.
 */
export const derContext = (tagNumber: number, content: Buffer): Buffer =>
  derNode(0xa0 + tagNumber, content)
