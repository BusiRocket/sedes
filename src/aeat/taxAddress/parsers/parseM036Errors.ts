import { unescapeJsString } from '../mappers/unescapeJsString'
import type { M036Error } from '../types/M036Error'

/** Every five-digit error code in a 036 answer, paired with the message value that follows it. */
export const parseM036Errors = (text: string): readonly M036Error[] => {
  const errors: M036Error[] = []
  for (const code of text.matchAll(/value:'(\d{5})'/g)) {
    const rest = text.slice(code.index + code[0].length)
    const message = /value:'((?:[^'\\]|\\.)*)'/.exec(rest)?.[1] ?? ''
    errors.push({ code: code[1] ?? '', message: unescapeJsString(message) })
  }
  return errors
}
