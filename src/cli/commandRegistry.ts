import type { Command } from './Command'

/** Every command the binary offers, in the order the help lists them. */
export const commandRegistry: readonly Command[] = []
