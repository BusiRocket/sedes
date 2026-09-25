/** A pause the downloads pace themselves with; tests inject one that returns at once. */
export type Sleep = (ms: number) => Promise<void>
